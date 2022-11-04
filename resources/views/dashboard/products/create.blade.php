@extends('dashboard.layouts.app')

@section('page.title')
    Create Product
@endsection

@section('styles')
    <link href="https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css"/>
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
            <li class="breadcrumb-item">
                <a href="{{ route('dashboard.products.index') }}">Products</a>
            </li>
            <li class="breadcrumb-item active">Create</li>
        </ol>
    </div><!-- /.col -->
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Add Product</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="add_product_form"
                          data-list-route="{{ route('dashboard.products.index') }}"
                          action="{{ route('dashboard.products.store') }}" data-reload="1" method="POST">
                        <div class="card-body">
                            <div class="fv-row form-group">
                                <label for="name">Name</label>
                                <input type="text" name="name" class="form-control" id="name"
                                       placeholder="Enter name">
                            </div>
                            <div class="fv-row form-group">
                                <label for="description">Description</label>
                                <textarea type="text" name="description" rows="5" class="form-control" id="description"
                                          placeholder="Enter description"></textarea>
                            </div>
                            <div class="fv-row form-group">
                                <label for="tags">Tags</label>
                                <input class="form-control" id="tags" name="tags"
                                       placeholder="Enter tags (comma seperated) ..."/>
                            </div>
                            <div class="form-group">
                                <label for="image">Image</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="image" name="image">
                                        <label class="custom-file-label" for="image">Choose file</label>
                                    </div>
                                    <div class="input-group-append">
                                        <span class="input-group-text">Upload</span>
                                    </div>
                                </div>
                            </div>
                            <div class="fv-row form-group">
                                <label>Category</label>
                                <select class="form-control" id="parent_category" name="category_id"
                                        data-list-url="{{ route('dashboard.common.list.categories') }}">
                                    <option value="" selected="selected">Select category</option>
                                </select>
                            </div>
                        </div>
                        <!-- /.card-body -->

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary" id="add_product_submit">
                                <span class="indicator-label">Save</span>
                                <span class="indicator-progress d-none">Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!--/. container-fluid -->
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@yaireo/tagify"></script>
    <script src="https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.polyfills.min.js"></script>
    <script src="{{ asset('plugins/bs-custom-file-input/bs-custom-file-input.min.js') }}"></script>
    <script src="{{ asset('assets/js/dashboard/categories/list-categories.js') }}" type="text/javascript"></script>
    <script src="{{ asset('assets/js/dashboard/products/create.js') }}"></script>
@endsection
