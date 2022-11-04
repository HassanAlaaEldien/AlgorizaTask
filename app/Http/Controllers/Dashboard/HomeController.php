<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Responses\ResponsesInterface;
use App\Models\Category;
use App\Models\Country;
use App\Models\Product;
use App\Providers\APIServiceProvider;
use App\Services\Filters\Elements\CategoriesFilters;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    /**
     * @var ResponsesInterface $responder
     */
    protected ResponsesInterface $responder;

    /**
     * HomeController constructor.
     * @param ResponsesInterface $responder
     */
    public function __construct(ResponsesInterface $responder)
    {
        $this->middleware('auth');
        $this->responder = $responder;
    }

    /**
     * @return View
     */
    public function index(): View
    {
        $categories_count = Category::count();
        $products_count = Product::count();

        return view('dashboard.index', compact('categories_count', 'products_count'));
    }

    /**
     * @param CategoriesFilters $categoriesFilters
     * @return JsonResponse
     */
    public function listCategories(CategoriesFilters $categoriesFilters): JsonResponse
    {
        $categories = Category::filter($categoriesFilters)->paginate(APIServiceProvider::ItemsPerPage);

        collect($categories->items())->map(fn($item) => $item['name'] = $item->name);

        return $this->responder->respondWithSelectTwoPagination($categories, $categories->items());
    }
}
