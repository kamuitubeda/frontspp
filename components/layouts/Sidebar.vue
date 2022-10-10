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
                <i class="mdi mdi mdi-school menu-icon"></i>
                <span class="menu-title">Kelas</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'santri'}">
                <NuxtLink class="nav-link" to="/santri">
                <i class="mdi mdi-account-card-details menu-icon"></i>
                <span class="menu-title">Santri</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'rekening'}">
                <NuxtLink class="nav-link" to="/rekening">
                <i class="mdi mdi-wallet menu-icon"></i>
                <span class="menu-title">Rekening</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'item'}">
                <NuxtLink class="nav-link" to="/item">
                <i class="mdi mdi-checkbox-multiple-blank menu-icon"></i>
                <span class="menu-title">Item</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'penagihan'}">
                <NuxtLink class="nav-link" to="/item">
                <i class="mdi mdi-book-open menu-icon"></i>
                <span class="menu-title">Penagihan</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'tagihan'}">
                <NuxtLink class="nav-link" to="/tagihan">
                <i class="mdi mdi-email menu-icon"></i>
                <span class="menu-title">Tagihan</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'laporan'}">
                <NuxtLink class="nav-link" to="/laporan">
                <i class="mdi mdi-file-chart menu-icon"></i>
                <span class="menu-title">Laporan</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'pegawai'}">
                <NuxtLink class="nav-link" to="/pegawai">
                <i class="mdi mdi-account-key menu-icon"></i>
                <span class="menu-title">Pegawai</span>
                </NuxtLink>
            </li>
            <li class="nav-item" :class="{ 'active': currentPage === 'setting'}">
                <NuxtLink class="nav-link" to="/setting">
                <i class="mdi mdi-settings menu-icon"></i>
                <span class="menu-title">Setting</span>
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
        methods: {
            initialize() {
            },
        }
    }
</script>