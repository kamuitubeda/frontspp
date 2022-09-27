<template>
    <!--Navbar -->
    <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
            <li class="nav-item">
                <NuxtLink class="nav-link " to="/">
                <i class="bi bi-grid"></i>
                <span>Dashboard</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link collapsed" to="/tapel">
                <i class="ri-calendar-todo-line"></i>
                <span>Tahun Pelajaran</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link collapsed" to="/kelas">
                <i class="ri-home-3-line"></i>
                <span>Kelas</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link collapsed" to="/santri">
                <i class="bi bi-person-badge"></i>
                <span>Santri</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link collapsed" to="/rekening">
                <i class="bi bi-credit-card-2-back"></i>
                <span>Rekening</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link collapsed" to="/tagihan">
                <i class="ri-secure-payment-line"></i>
                <span>Tagihan</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link collapsed" to="/laporan">
                <i class="ri-file-chart-line"></i>
                <span>Laporan</span>
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>

<script>
    export default {
        
    }
</script>