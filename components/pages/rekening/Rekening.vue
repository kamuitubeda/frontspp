<template>
    <div>
        <div class="pagetitle">
        <h1 class="display-3">Rekening</h1>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="breadcrumb-item active">Rekening</li>
        </ol>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div class="col-sm-6 col-md-4">
                                    <input type="text" class="form-control" placeholder="Masukkan kata kunci" v-model="filter" />
                                </div>
                                <div class="col-md-4 d-flex justify-content-end">
                                    <button type="button" class="btn btn-primary btn-sm btn-icon d-md-none" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                        <i class="mdi mdi-plus-circle"></i>
                                    </button>
                                    <button class="btn btn-primary d-none d-md-block" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                        Tambah Rekening
                                    </button>
                                    <NuxtLink class="btn btn-info btn-sm btn-icon d-md-none ms-2" to="/item"><i class="mdi mdi-file-document-box"></i></NuxtLink>
                                    <NuxtLink class="btn btn-info ml-auto d-none d-md-block ms-2" to="/item">Daftar Item</NuxtLink>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div v-if="loading" class="loading-page d-flex justify-content-center">
                                        <div>
                                            <img src="~/assets/images/loading.gif" alt="Loading">
                                        </div>
                                    </div>
                                    <div v-else class="table-responsive">
                                        <table id="add-row" class="display table table-head-bg-primary table-hover" >
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Jenis</th>
                                                    <th>Total</th>
                                                    <th class="text-center" style="width: 20%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(row,index) in filteredRows" :key="index">
                                                    <td>{{ row.nama }}</td>
                                                    <td>{{ row.jenis }}</td>
                                                    <td>{{ harga(Number(row.total)) }}</td>
                                                    <td>
                                                        <div class="text-center">
                                                            <button type="button" class="btn btn-outline-info btn-icon btn-sm" @click="show(row.id)" data-toggle="modal" data-target="#editRowModal">
                                                                <i class="mdi mdi-eye"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-outline-warning btn-icon btn-sm" @click="editRow(row)" data-toggle="modal" data-target="#editRowModal">
                                                                <i class="mdi mdi-lead-pencil"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-outline-danger btn-icon btn-sm" @click="deleteRow(row, index)" data-toggle="tooltip" title="">
                                                                <i class="mdi mdi-delete"></i> 
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="addRowModal" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header no-bd">
                                        <h5 class="modal-title">
                                            <span class="fw-mediumbold">
                                            Rekening</span> 
                                            <span class="fw-light">
                                                Baru
                                            </span>
                                        </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearInput"></button>
                                    </div>
                                    <form @submit.prevent="save" autocomplete="off">
                                    <div class="modal-body">
                                        <p class="small">Isi semua kolom berikut ini</p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Nama Rekening</label>
                                                    <input id="nama" type="text" class="form-control" v-model="simpan.nama" placeholder="Syahriah Bulanan Kelas 7" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="form-group">
                                                    <label>Jenis Rekening</label>
                                                    <input id="jenis" type="text" class="form-control" v-model="simpan.jenis" placeholder="Bulanan" required>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearInput">Close</button>
                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="editRowModal" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header no-bd">
                                        <h5 class="modal-title">
                                            <span class="fw-mediumbold">
                                            Edit</span> 
                                            <span class="fw-light">
                                                Rekening
                                            </span>
                                        </h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form @submit.prevent="update">
                                    <div class="modal-body">
                                        <p class="small">Isi semua kolom berikut ini</p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Nama Rekening</label>
                                                    <input id="nama" type="text" class="form-control" v-model="edit.nama" placeholder="Syahriah Bulanan Kelas 7" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="form-group">
                                                    <label>Jenis Rekening</label>
                                                    <input id="jenis" type="text" class="form-control" v-model="edit.jenis" placeholder="Bulanan" required>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-bd">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
                                        <button type="submit" id="editRowButton" class="btn btn-primary">Simpan</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>
<style>
.modal { z-index: 1001 !important;} 
.modal-backdrop {z-index: 1000 !important;}
</style>
<script>
import axios from 'axios'
export default {
    modules: [
        '@nuxtjs/axios',
    ],
    data() {
      return {
        loading: false,
        filter: '',
        rows: [],
        rekening: [],
        simpan: {
            nama: '',
            jenis: ''
        },
        edit: {
            id: '',
            nama: '',
            jenis: ''
        }
      }
    },
    mounted() {
		this.initialize();
	},
    async fetch() {
    },
    computed: {
        filteredRows() {
            return this.rows.filter(row => {
                const nama = row.nama.toLowerCase();
                const jenis = row.jenis.toString().toLowerCase();
                const searchTerm = this.filter.toLowerCase();

                return nama.includes(searchTerm) || 
                jenis.includes(searchTerm);
            });
        }
    },
    methods: {
        initialize() {
            this.loading = true
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rekening-total'

            axios.get(apiURL, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.rekening = response.data.data
                this.rows = this.rekening
                this.loading = false
            })
            .catch(error => {
                console.log(error)
                this.loading = false
            })
        },
        save(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rekening'

            e.preventDefault()

            this.$axios.post(apiURL, {
                //data yang dikirim ke server
                nama: this.simpan.nama,
                jenis: this.simpan.jenis
                },{
                headers: {
                    'Authorization': token
                }
                })
                .then(() => {
                    this.clearInput();
                    this.initialize();
                    $(':input','#addRowModal').val("");
                    $('#addRowModal').modal('toggle');
                })
                .catch(error => {
                    this.validation = error.response.data
                })
        },
        update(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rekening/' + this.edit.id

            e.preventDefault()

            this.$axios.put(apiURL, {
                nama: this.edit.nama,
                jenis: this.edit.jenis,
                },{
                headers: {
                    'Authorization': token
                }
                })
                .then(() => {
                    this.initialize();
                    $(':input','#editRowModal').val("");
                    $('#editRowModal').modal('toggle');
                })
                .catch(error => {
                    this.validation = error.response.data
                })
        },
        deleteRow(item, index) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rekening/' + item.id

            this.$swal.fire({
                title: 'Hapus data rekening?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Hapus`,
                cancelButtonText: `Batal`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    //send data ke Rest API
                    this.$axios.delete(apiURL, {
                        headers: {
                            'Authorization': token
                        }
                    })
                    .then(() => {
                        this.rekening.splice(index, 1);
                        this.initialize();
                    })
                    .catch(error => {
                        //assign validation  
                        this.validation = error.response.data
                    })
                } else if (result.isDenied) {
                    Swal.fire('Rekening batal dihapus', '', 'info')
                }
            })
        },
        show(id) {
            this.$router.push('/rekening/'+id);
        },
        editRow(item) {
            this.edit = item;
            $('#editRowModal').modal('show');
        },
        clearInput() {
            this.simpan.nama = '';
            this.simpan.jenis = '';
        },
        harga(number){
            return number.toLocaleString('id', { style: 'currency', currency: 'IDR' })
        },
    }
}
</script>