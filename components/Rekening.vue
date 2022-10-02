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
                            <div class="row mt-2">
                                <div class="col-sm-6">
                                    <button style="display:block; width:100%;" class="btn btn-primary ml-auto" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                        Tambah Rekening
                                    </button>
                                </div>
                                <div class="col-sm-6" style="padding-top:0.5em;">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Masukkan kata kunci" v-model="filter" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="table-responsive">
                                        <table id="add-row" class="display table table-head-bg-primary table-hover" >
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th style="width: 20%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(row,index) in filteredRows" :key="index">
                                                <tr>
                                                    <td>{{ row.nama }}</td>
                                                    <td>
                                                        <div class="form-button-action">
                                                            <button type="button" @click="editRow(row.combinedId)" data-toggle="modal" data-target="#editRowModal" class="btn btn-sm btn-primary" style="margin-right:2.5px" data-original-title="Edit Barang">
                                                                Edit
                                                            </button>
                                                            <button type="button" @click="deleteRow(row.combinedId, index)" data-toggle="tooltip" title="" class="btn btn-sm btn-danger" data-original-title="Remove">
                                                                Hapus
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
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form @submit.prevent="save" autocomplete="off">
                                    <div class="modal-body">
                                        <p class="small">Isi semua kolom berikut ini</p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Jenjang Rekening</label>
                                                    <input id="jenjang" type="text" class="form-control" v-model="simpan.jenjang" placeholder="7" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="form-group">
                                                    <label>Nama Ruang Rekening</label>
                                                    <input id="ruang" type="text" class="form-control" v-model="simpan.ruang" placeholder="A" required>
                                                </div>
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
                                            <span class="fw-mediumbold">
                                            Pelanggan</span> 
                                            <span class="fw-light">
                                                Edit
                                            </span>
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form @submit.prevent="update">
                                    <div class="modal-body">
                                        <p class="small">Isi semua kolom berikut ini</p>
                                    </div>
                                    <div class="modal-footer no-bd">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Batal</button>
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
        filter: '',
        rows: [],
        rekening: [],
        simpan: {
            nomor_induk: '',
            nama: '',
            alamat: '',
            nama_wali: '',
            aktif: 1,
            rekening: 1,
        },
        edit: {
            nomor_induk: '',
            nama: '',
            alamat: '',
            nama_wali: '',
            aktif: 1,
            rekening: 1,
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
                const alamat = row.alamat.toString().toLowerCase();
                const telepon = row.telepon.toLowerCase();
                const searchTerm = this.filter.toLowerCase();

                return nama.includes(searchTerm) || 
                alamat.includes(searchTerm) ||
                telepon.includes(searchTerm);
            });
        }
    },
    methods: {
        initialize() {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rekening'

            axios.get(apiURL, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.rekening = response.data.data
                this.rows = this.rekening
            })
            .catch(error => {
                console.log(error)
            })
        },
        save(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rekening'

            e.preventDefault()

            this.$axios.post(apiURL, {
                //data yang dikirim ke server
                jenjang: this.simpan.jenjang,
                ruang: this.simpan.ruang,
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
        clearInput() {
            this.simpan.jenjang = '';
            this.simpan.ruang = '';
        }
    }
}
</script>