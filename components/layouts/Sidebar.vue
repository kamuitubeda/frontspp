<template>
    <!--Navbar -->
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
        <li class="nav-item" :class="{ 'active': currentPage === 'index'}">
            <NuxtLink class="nav-link" to="/">
            <i class="mdi mdi-grid-large menu-icon"></i>
            <span class="menu-title">Dashboard</span>
            </NuxtLink>
        </li>
        <li class="nav-item" :class="{ 'active': currentPage === 'kelas'}">
            <NuxtLink class="nav-link" to="/kelas">
            <i class="mdi mdi-grid-large menu-icon"></i>
            <span class="menu-title">Kelas</span>
            </NuxtLink>
        </li>
        <li class="nav-item nav-category">UI Elements</li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i class="menu-icon mdi mdi-floor-plan"></i>
            <span class="menu-title">UI Elements</span>
            <i class="menu-arrow"></i> 
            </a>
            <div class="collapse" id="ui-basic">
            <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/ui-features/buttons.html">Buttons</NuxtLink></li>
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/ui-features/dropdowns.html">Dropdowns</NuxtLink></li>
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/ui-features/typography.html">Typography</NuxtLink></li>
            </ul>
            </div>
        </li>
        <li class="nav-item nav-category">Forms and Datas</li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
            <i class="menu-icon mdi mdi-card-text-outline"></i>
            <span class="menu-title">Form elements</span>
            <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="form-elements">
            <ul class="nav flex-column sub-menu">
                <li class="nav-item"><NuxtLink class="nav-link" to="pages/forms/basic_elements.html">Basic Elements</NuxtLink></li>
            </ul>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
            <i class="menu-icon mdi mdi-chart-line"></i>
            <span class="menu-title">Charts</span>
            <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="charts">
            <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/charts/chartjs.html">ChartJs</NuxtLink></li>
            </ul>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
            <i class="menu-icon mdi mdi-table"></i>
            <span class="menu-title">Tables</span>
            <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="tables">
            <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/tables/basic-table.html">Basic table</NuxtLink></li>
            </ul>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
            <i class="menu-icon mdi mdi-layers-outline"></i>
            <span class="menu-title">Icons</span>
            <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="icons">
            <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/icons/mdi.html">Mdi icons</NuxtLink></li>
            </ul>
            </div>
        </li>
        <li class="nav-item nav-category">pages</li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <i class="menu-icon mdi mdi-account-circle-outline"></i>
            <span class="menu-title">User Pages</span>
            <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth">
            <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <NuxtLink class="nav-link" to="pages/samples/login.html"> Login </NuxtLink></li>
            </ul>
            </div>
        </li>
        <li class="nav-item nav-category">help</li>
        <li class="nav-item">
            <NuxtLink class="nav-link" to="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html">
            <i class="menu-icon mdi mdi-file-document"></i>
            <span class="menu-title">Documentation</span>
            </NuxtLink>
        </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                filter: '',
                rows: [],
                kelas: [],
                simpan: {
                    nama: '',
                    jenjang: '',
                    ruang: '',
                },
                edit: {
                    combinedId: '',
                    nama: '',
                    jenjang: '',
                    ruang: '',
                }
            }
        },
        computed: {
            currentPage() {
                return this.$route.name
            },
        },
    }
</script>