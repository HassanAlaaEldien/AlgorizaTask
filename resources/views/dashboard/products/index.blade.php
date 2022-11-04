@extends('dashboard.layouts.app')

@section('page.title')
    List Products
@endsection

@section('styles')
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet"/>
    <style>
        .select2-container .select2-selection--single {
            height: 38px !important;
        }
    </style>
@endsection

@section('breadcrumb')
    <div class="col-sm-6">
        <h1 class="m-0">Manage Products</h1>
    </div><!-- /.col -->
    <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
                <a href="{{ route('dashboard.home') }}">Home</a>
            </li>
            <li class="breadcrumb-item active">Products</li>
        </ol>
    </div><!-- /.col -->
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <form id="search" action="{{ route('dashboard.products.index') }}">
                    <div class="row" style="margin-top: 10px">
                        <div class="form-group col-md-2">
                            <label for="name">Name:
                                <a href="?{{ Arr::query(request()->except('name')) }}">
                                    <i class="fas fa-eraser" style="color: red;"></i>
                                </a>
                            </label>
                            <input id="name" type="text" class="form-control" name="name"
                                   value="{{ request()->name }}"
                                   placeholder="Search Name ...">
                        </div>
                        <div class="form-group col-md-2">
                            <label for="description">Description:
                                <a href="?{{ Arr::query(request()->except('description')) }}">
                                    <i class="fas fa-eraser" style="color: red;"></i>
                                </a>
                            </label>
                            <input id="description" type="text" class="form-control" name="description"
                                   value="{{ request()->description }}"
                                   placeholder="Search description ...">
                        </div>
                        <div class="form-group col-md-2">
                            <label for="tags">Tags:
                                <a href="?{{ Arr::query(request()->except('tags')) }}">
                                    <i class="fas fa-eraser" style="color: red;"></i>
                                </a>
                            </label>
                            <input id="tags" type="text" class="form-control" name="tags"
                                   value="{{ request()->tags }}"
                                   placeholder="Search tags ...">
                        </div>
                        <div class="form-group col-md-2">
                            <label for="category"> Category:
                                <a href="?{{ Arr::query(request()->except('category')) }}">
                                    <i class="fas fa-eraser" style="color: red;"></i>
                                </a>
                            </label>
                            <select class="form-control" id="parent_category" name="category"
                                    data-list-url="{{ route('dashboard.common.list.categories') }}">
                                @if($selectedCategory)
                                    <option value="{{ $selectedCategory?->id }}"
                                            selected>{{ $selectedCategory?->name }}</option>
                                @else
                                    <option value="" selected="selected">Select category</option>
                                @endif
                            </select>
                        </div>
                        <div class="form-group col-md-4" style="margin-top: 32px">
                            <button type="submit" id="submit-button" class="btn btn-success font-weight-bold mr-2">
                                Search
                            </button>
                            <a class="btn btn-danger font-weight-bold mr-2"
                               href="{{ route('dashboard.products.index') }}">
                                Clear All
                            </a>
                        </div>
                    </div>
                </form>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Products List</h3>
                        <div class="card-tools">
                            {!! $products->links('vendor.pagination.default') !!}
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body p-0">
                        <table class="table">
                            <thead>
                            <tr>
                                <th style="width: 10px">#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Tags</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @forelse($products as $product)
                                <tr id="row-{{ $product->id }}">
                                    <td>{{ $product->id }}.</td>
                                    <td>
                                        <img src="{{ url('storage/' . $product->image) }}"
                                             alt="{{ $product->name }}-image-alt"
                                             style="max-width: 100px;max-height: 100px;">
                                    </td>
                                    <td>{{ $product->name }}</td>
                                    <td>{{ $product->description }}</td>
                                    <td>
                                        <span class="badge bg-success">
                                            {{ $product->tags }}
                                        </span>
                                    </td>
                                    <td>{{ $product->category?->name ?: '-' }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-info">Action</button>
                                            <button type="button" class="btn btn-info dropdown-toggle dropdown-icon"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div class="dropdown-menu" role="menu" style="">
                                                <a class="dropdown-item"
                                                   href="{{ route('dashboard.products.edit', $product) }}">
                                                    Edit
                                                </a>
                                                <a data-url="{{ route('dashboard.products.destroy', $product) }}"
                                                   data-item-id="{{ $product->id }}"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#delete_modal"
                                                   class="dropdown-item delete-button">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div style="text-align: center;">
                                            No Products
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                            @endforelse
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
        </div>
    </div><!--/. container-fluid -->

    @include('dashboard.includes.delete-modal',['action_message' => 'product'])
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="{{ asset('assets/js/dashboard/categories/list-categories.js') }}" type="text/javascript"></script>
    <script src="{{ asset('assets/js/dashboard/delete-item.js') }}" type="text/javascript"></script>
@endsection
