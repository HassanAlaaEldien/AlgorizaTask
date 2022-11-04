@extends('dashboard.layouts.app')

@section('page.title')
    Create Category
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
        <h1 class="m-0">Manage Categories</h1>
    </div><!-- /.col -->
    <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
                <a href="{{ route('dashboard.home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{ route('dashboard.categories.index') }}">Categories</a>
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
                        <h3 class="card-title">Add Category</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="add_category_form"
                          data-list-route="{{ route('dashboard.categories.index') }}"
                          action="{{ route('dashboard.categories.store') }}" data-reload="1" method="POST">
                        <div class="card-body">
                            <div class="fv-row form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" name="name" class="form-control" id="name"
                                       placeholder="Enter name">
                            </div>
                            <div class="fv-row form-group">
                                <label>Parent Category</label>
                                <select class="form-control" id="parent_category" name="parent_category_id"
                                        data-list-url="{{ route('dashboard.common.list.categories') }}">
                                    <option value="" selected="selected">Select category</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <!-- radio -->
                                <div class="fv-row form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="is_active" value="1">
                                        <label class="form-check-label">Active</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="is_active" value="0" checked>
                                        <label class="form-check-label">Not Active</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary" id="add_category_submit">
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
    <script src="{{ asset('assets/js/dashboard/categories/list-categories.js') }}" type="text/javascript"></script>
    <script src="{{ asset('assets/js/dashboard/categories/create.js') }}"></script>
@endsection
