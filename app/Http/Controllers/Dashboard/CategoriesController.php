<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreCategoryRequest;
use App\Http\Responses\ResponsesInterface;
use App\Models\Category;
use App\Providers\APIServiceProvider;
use App\Services\Filters\Elements\CategoriesFilters;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;

class CategoriesController extends Controller
{
    /**
     * @var ResponsesInterface $responder
     */
    protected ResponsesInterface $responder;

    /**
     * CategoriesController constructor.
     * @param ResponsesInterface $responder
     */
    public function __construct(ResponsesInterface $responder)
    {
        $this->middleware('auth');
        $this->responder = $responder;
    }

    /**
     * Display a listing of the resource.
     *
     * @param CategoriesFilters $categoriesFilters
     * @return View
     */
    public function index(CategoriesFilters $categoriesFilters): View
    {
        $categories = Category::filter($categoriesFilters)->paginate(APIServiceProvider::ItemsPerPage);

        $selectedCategory = request()->parent_category ? Category::find(request()->parent_category) : null;

        return view('dashboard.categories.index', compact('categories','selectedCategory'));
    }

    /**
     * Show the form for creating a new resource .
     *
     * @return View
     */
    public function create(): View
    {
        return view('dashboard.categories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCategoryRequest $request
     * @return JsonResponse
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        Category::create($request->only(['name', 'parent_category_id', 'is_active']));

        return $this->responder->respond([
            'data' => [
                'message' => 'Category has been added successfully!'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Category $category
     * @return View
     */
    public function edit(Category $category): View
    {
        return view('dashboard.categories.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Category $category
     * @param StoreCategoryRequest $request
     * @return JsonResponse
     */
    public function update(Category $category, StoreCategoryRequest $request): JsonResponse
    {
        $category->update($request->only(['name', 'parent_category_id', 'is_active']));

        return $this->responder->respond([
            'data' => ['message' => 'Category has been updated successfully!']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return $this->responder->respond([
            'data' => ['message' => 'Category has been deleted successfully!']
        ]);
    }
}
