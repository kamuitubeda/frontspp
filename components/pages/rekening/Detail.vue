<template>
    <div>
        <div class="pagetitle">
        <h1 class="display-3">Rincian Rekening</h1>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink to="/rincian">Rekening</NuxtLink></li>
            <li class="breadcrumb-item active">Rincian</li>
        </ol>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">
                <div class="row">
                    <div class="col-md-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                            <h4 class="card-title">Nama Rekening</h4>
                            <div class="media">
                                <i class="mdi mdi-domain icon-lg text-info d-flex align-self-start me-3"></i>
                                <div class="media-body">
                                    <p class="display-3">{{kelas.nama}}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                            <h4 class="card-title">Total Biaya</h4>
                            <div class="media">
                                <i class="mdi mdi-account-box-outline icon-lg text-info d-flex align-self-center me-3"></i>
                                <div class="media-body">
                                    <p class="display-3">{{jumlah_santri}}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex justify-content-between">
                                        <div class="col-sm-6 col-md-4">
                                            <input type="text" class="form-control" placeholder="Masukkan kata kunci" v-model="filter" />
                                        </div>
                                        <div class="col-md-4 d-flex justify-content-end">
                                            <button type="button" class="btn btn-primary btn-sm btn-icon d-md-none" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                                <i class="mdi mdi-plus-circle"></i>
                                            </button>
                                            <button class="btn btn-primary d-none d-md-block" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                                Tambah Item
                                            </button>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table id="add-row" class="table table-hover" >
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Harga</th>
                                                    <th class="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(row,index) in filteredRows" :key="index">
                                                <tr>
                                                    <td>{{ row.nama }}</td>
                                                    <td>{{ row.harga }}</td>
                                                    <td>
                                                        <div class="text-center">
                                                            <button type="button" class="btn btn-outline-info btn-icon btn-sm" @click="show(row.combinedId)" data-toggle="modal" data-target="#editRowModal">
                                                                <i class="mdi mdi-eye"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-outline-warning btn-icon btn-sm" @click="editRow(row.combinedId)" data-toggle="modal" data-target="#editRowModal">
                                                                <i class="mdi mdi-lead-pencil"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-outline-danger btn-icon btn-sm" @click="deleteRow(row.combinedId, index)" data-toggle="tooltip" title="">
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
                                            Tambah</span> 
                                            <span class="fw-light">
                                                Rincian
                                            </span>
                                        </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form @submit.prevent="save" autocomplete="off">
                                    <div class="modal-body">
                                        <p class="small">Silakan pilih item yang akan ditambahkan</p>
                                        <div class="row">
                                            <div class="col-12">
                                                <multiselect
                                                    v-model="selected"
                                                    :options="items"
                                                    :multiple="true"
                                                    :close-on-select="false"
                                                    :clear-on-select="false"
                                                    :hide-selected="true"
                                                    :preserve-search="true"
                                                    placeholder="Pilih Item"
                                                    :custom-label="customLabel" 
                                                    track-by="nama"
                                                    :preselect-first="false"
                                                    id="multi"
                                                    @input="reload"
                                                    >
                                                </multiselect>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                                            <span class="fw-light">
                                                Edit
                                            </span>
                                            <span class="fw-mediumbold">
                                                Kelas
                                            </span> 
                                        </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form @submit.prevent="update">
                                    <div class="modal-body">
                                        <p class="small">Isi semua kolom berikut ini</p>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>Jenjang Kelas</label>
                                                    <input id="editNamaPelanggan" type="text" class="form-control" v-model="edit.jenjang" />
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>Ruang Kelas</label>
                                                    <input id="editPhonePelanggan" type="text" class="form-control" v-model="edit.ruang" />
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
import Multiselect from 'vue-multiselect'
import axios from 'axios'
export default {
    modules: [
        '@nuxtjs/axios',
    ],
    components: { Multiselect },
    data() {
      return {
        filter: '',
        jumlah_santri: 0,
        rows: [],
        items: [],
        rekenings: [],
        selected: [],
        kelas: {},
        simpan: {
            rekening_id: '',
            item_id: ''
        },
        edit: {
            rekening_id: '',
            item_id: ''
        }
      }
    },
    created(){
        this.rekeningId = this.$route.params.id;
        this.simpan.rekening_id = this.rekeningId;
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
                const harga = row.harga.toString().toLowerCase();
                const searchTerm = this.filter.toLowerCase();

                return nama.includes(searchTerm) || 
                harga.includes(searchTerm);
            });
        }
    },
    methods: {
        initialize() {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const rekening = baseURL + '/api/rekening/' + this.rekeningId
            const item = baseURL + '/api/item'

            axios.get(rekening, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.rekening = response.data.data
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(item, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.items = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        save(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rincian-rekening'

            e.preventDefault()

            this.$axios.post(apiURL, {
                //data yang dikirim ke server
                jenjang: this.simpan.rekening_id,
                ruang: this.simpan.item_id,
                tahun_pelajaran_id: 2
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
                    //assign validation  
                    this.validation = error.response.data
                })
        },
        editRow(item) {
            this.edit = item;
            $('#editRowModal').modal('show');
        },
        deleteRow(item, index) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/kelas/' + item.id

            this.$swal.fire({
                title: 'Hapus data kelas?',
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
                        this.kelas.splice(index, 1);
                        this.initialize();
                    })
                    .catch(error => {
                        //assign validation  
                        this.validation = error.response.data
                    })
                } else if (result.isDenied) {
                    Swal.fire('Kelas batal dihapus', '', 'info')
                }
            })
        },
        show(id) {
            this.$router.push('/'+id);
        },
        clearInput() {
            this.simpan.jenjang = '';
            this.simpan.ruang = '';
        },
        customLabel ({ nama, harga }) {
            let number = Number(harga)
            let formatted = number.toLocaleString('id', { style: 'currency', currency: 'IDR' })
            return `${nama} – ${formatted}`
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>