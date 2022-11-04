<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreProductRequest;
use App\Http\Responses\ResponsesInterface;
use App\Models\Category;
use App\Models\Product;
use App\Providers\APIServiceProvider;
use App\Services\Filters\Elements\ProductsFilters;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class ProductsController extends Controller
{
    /**
     * @var ResponsesInterface $responder
     */
    protected ResponsesInterface $responder;

    /**
     * ProductsController constructor.
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
     * @param ProductsFilters $productsFilters
     * @return View
     */
    public function index(ProductsFilters $productsFilters): View
    {
        $products = Product::filter($productsFilters)->paginate(APIServiceProvider::ItemsPerPage);

        $selectedCategory = request()->category ? Category::find(request()->category) : null;

        return view('dashboard.products.index', compact('products', 'selectedCategory'));
    }

    /**
     * Show the form for creating a new resource .
     *
     * @return View
     */
    public function create(): View
    {
        return view('dashboard.products.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @return JsonResponse
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        Product::create($request->only(['name', 'description', 'tags', 'image', 'category_id']));

        return $this->responder->respond([
            'data' => [
                'message' => 'Product has been added successfully!'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Product $product
     * @return View
     */
    public function edit(Product $product): View
    {
        return view('dashboard.products.edit', compact('product'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Product $product
     * @param StoreProductRequest $request
     * @return JsonResponse
     */
    public function update(Product $product, StoreProductRequest $request): JsonResponse
    {
        $product->update($request->only(['name', 'description', 'tags', 'image', 'category_id']));

        return $this->responder->respond([
            'data' => ['message' => 'Product has been updated successfully!']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return $this->responder->respond([
            'data' => ['message' => 'Product has been deleted successfully!']
        ]);
    }
}
