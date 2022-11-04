<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ route('dashboard.home') }}" class="brand-link">
        <img src="{{ asset('assets/img/AdminLTELogo.png') }}" alt="AdminLTE Logo"
             class="brand-image img-circle elevation-3"
             style="opacity: .8">
        <span class="brand-text font-weight-light">Algoriza Task</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{ asset('assets/img/user2-160x160.jpg') }}" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">{{ auth()->user()->name }}</a>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                     with font-awesome or any other icon font library -->
                <li class="nav-item menu-open">
                    <a href="#" class="nav-link active">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item {{ request()->route()->named(['dashboard.categories.index','dashboard.categories.create']) ? 'menu-is-opening menu-open' : '' }}">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-circle"></i>
                                <p>
                                    Categories
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{ route('dashboard.categories.index') }}"
                                       class="nav-link {{ request()->route()->named('dashboard.categories.index') ? 'active' : '' }}">
                                        <i class="far fa-dot-circle nav-icon"></i>
                                        <p>List</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('dashboard.categories.create') }}"
                                       class="nav-link {{ request()->route()->named('dashboard.categories.create') ? 'active' : '' }}">
                                        <i class="far fa-dot-circle nav-icon"></i>
                                        <p>Create</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item {{ request()->route()->named(['dashboard.products.index','dashboard.products.create']) ? 'menu-is-opening menu-open' : '' }}">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-circle"></i>
                                <p>
                                    Products
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{ route('dashboard.products.index') }}"
                                       class="nav-link {{ request()->route()->named('dashboard.products.index') ? 'active' : '' }}">
                                        <i class="far fa-dot-circle nav-icon"></i>
                                        <p>List</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('dashboard.products.create') }}"
                                       class="nav-link {{ request()->route()->named('dashboard.products.create') ? 'active' : '' }}">
                                        <i class="far fa-dot-circle nav-icon"></i>
                                        <p>Create</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('logout') }}" class="nav-link">
                                <i class="nav-icon fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>
