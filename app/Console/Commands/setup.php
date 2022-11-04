<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class setup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:setup {--root-password=} {--fresh}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Build Algoriza Task also, migrate and seed our database with needed data.';

    /**
     * @var array
     */
    protected array $setupFileContent = [
        'run-migration' => FALSE,
        'generate-super-admin' => FALSE
    ];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->withErrorHandling(function () {
            $this->freshSetupCheck();
            $this->setSetupFileContent();
            foreach ($this->setupFileContent as $option => $status) {
                $method = Str::camel($option);
                if ($this->validateNotSetupBefore($option) && method_exists($this, $method))
                    $this->{$method}();
            }
            $this->completeSetup();
        });
    }

    /**
     * Handle expected errors
     *
     * @param $callback
     */
    protected function withErrorHandling($callback)
    {
        try {
            $callback();
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
        }
    }

    /**
     * Run all migrations.
     */
    protected function runMigration()
    {
        $freshInstallation = $this->option('fresh');

        Artisan::call(
            ($freshInstallation ? 'migrate:fresh' : 'migrate')
        );

        $this->updateSetupFile('run-migration');
    }

    /**
     * Generate super-admin user to manage our CRM.
     */
    protected function generateSuperAdmin()
    {
        $rootPassword = $this->option('root-password');
        if (!$rootPassword) {
            $rootPassword = Str::random(8);
        }

        $rootEmail = 'root-user@algoriza-task.com';
        User::firstOrCreate(
            ['id' => 1],
            [
                'name' => 'Root User',
                'email' => $rootEmail,
                'email_verified_at' => now(),
                'password' => bcrypt($rootPassword),
            ]
        );

        $this->line('<comment>Root Email    : </comment> ' . $rootEmail);
        $this->line('<comment>Root Password : </comment> ' . $rootPassword);

        $this->updateSetupFile('generate-super-admin');
    }

    /**
     * Mark the setup as completed
     */
    protected function completeSetup()
    {
        file_put_contents($this->getSetupFilePath(), json_encode($this->setupFileContent));

        $this->info('Setup is completed');
    }

    /**
     * Get the lock file name
     *
     * @return string
     */
    protected function getSetupFilePath()
    {
        return storage_path('setup.json');
    }

    /**
     * @return void
     */
    private function setSetupFileContent(): void
    {
        $this->setupFileContent = $this->getSetupFileContent();
    }

    /**
     * Prepare setup file content.
     *
     * @return array
     */
    private function getSetupFileContent(): array
    {
        return file_exists($this->getSetupFilePath())
            ? json_decode(file_get_contents($this->getSetupFilePath()), TRUE)
            : $this->setupFileContent;
    }

    /**
     * @return void
     */
    protected function updateSetupFile($option): void
    {
        $this->setupFileContent = Collection::make($this->setupFileContent)
            ->map(fn($value, $key) => $key === $option ?: $value)->toArray();
    }

    /**
     * @return bool
     */
    protected function validateNotSetupBefore($option): bool
    {
        return !Collection::make($this->setupFileContent)
            ->filter(fn($value, $key) => $key === $option)[$option];
    }

    /**
     * @return void
     */
    protected function freshSetupCheck(): void
    {
        if ($this->option('fresh'))
            !file_exists($this->getSetupFilePath()) ?: unlink($this->getSetupFilePath());
    }
}
