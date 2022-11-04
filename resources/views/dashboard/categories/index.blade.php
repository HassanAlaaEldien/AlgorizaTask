@extends('dashboard.layouts.app')

@section('page.title')
    List Categories
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
            <li class="breadcrumb-item active">Categories</li>
        </ol>
    </div><!-- /.col -->
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <form id="search" action="{{ route('dashboard.categories.index') }}">
                    <div class="row" style="margin-top: 10px">
                        <div class="form-group col-md-4">
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
                            <label for="code"> Parent Category:
                                <a href="?{{ Arr::query(request()->except('parent_category')) }}">
                                    <i class="fas fa-eraser" style="color: red;"></i>
                                </a>
                            </label>
                            <select class="form-control" id="parent_category" name="parent_category"
                                    data-list-url="{{ route('dashboard.common.list.categories') }}">
                                @if($selectedCategory)
                                    <option value="{{ $selectedCategory?->id }}"
                                            selected>{{ $selectedCategory?->name }}</option>
                                @else
                                    <option value="" selected="selected">Select category</option>
                                @endif
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="code"> Is Active:
                                <a href="?{{ Arr::query(request()->except('is_active')) }}">
                                    <i class="fas fa-eraser" style="color: red;"></i>
                                </a>
                            </label>
                            <select class="form-control" id="is_active" name="is_active">
                                <option value="" selected="selected">Select active</option>
                                <option value="yes" {{ request()->is_active == 'yes' ? 'selected' : '' }}>
                                    Yes
                                </option>
                                <option value="no" {{ request()->is_active == 'no' ? 'selected' : '' }}>
                                    No
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-md-4" style="margin-top: 32px">
                            <button type="submit" id="submit-button" class="btn btn-success font-weight-bold mr-2">
                                Search
                            </button>
                            <a class="btn btn-danger font-weight-bold mr-2"
                               href="{{ route('dashboard.categories.index') }}">
                                Clear All
                            </a>
                        </div>
                    </div>
                </form>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Categories List</h3>
                        <div class="card-tools">
                            {!! $categories->links('vendor.pagination.default') !!}
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body p-0">
                        <table class="table">
                            <thead>
                            <tr>
                                <th style="width: 10px">#</th>
                                <th>Name</th>
                                <th>Parent Category</th>
                                <th>Is Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @forelse($categories as $category)
                                <tr id="row-{{ $category->id }}">
                                    <td>{{ $category->id }}.</td>
                                    <td>{{ $category->name }}</td>
                                    <td>{{ $category->parent?->name ?: '-' }}</td>
                                    <td>
                                        <span class="badge bg-{{ $category->is_active ? 'success' : 'danger' }}">
                                            {{ $category->is_active ? 'Yes' : 'No' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-info">Action</button>
                                            <button type="button" class="btn btn-info dropdown-toggle dropdown-icon"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div class="dropdown-menu" role="menu" style="">
                                                <a class="dropdown-item"
                                                   href="{{ route('dashboard.categories.edit', $category) }}">
                                                    Edit
                                                </a>
                                                <a data-url="{{ route('dashboard.categories.destroy', $category) }}"
                                                   data-item-id="{{ $category->id }}"
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
                                    <td>
                                        <div style="text-align: center;">
                                            No Categories
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

    @include('dashboard.includes.delete-modal',['action_message' => 'category'])
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="{{ asset('assets/js/dashboard/categories/list-categories.js') }}" type="text/javascript"></script>
    <script src="{{ asset('assets/js/dashboard/delete-item.js') }}" type="text/javascript"></script>
@endsection
