<template>
    <div>
        <div class="pagetitle">
        <h1 class="display-3">Rincian Penagihan</h1>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink to="/penagihan">Penagihan</NuxtLink></li>
            <li class="breadcrumb-item active">Rincian</li>
        </ol>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">
                <div class="col-md-6 grid-margin">
                    <div class="card">
                        <div class="card-body">
                        <h4 class="card-title">Nama Rekening</h4>
                        <div class="media">
                            <i class="mdi mdi-domain icon-lg text-info d-flex align-self-start me-3"></i>
                            <div class="media-body">
                                <p class="display-3">{{selectedRekening.nama}}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 grid-margin">
                    <div class="card">
                        <div class="card-body">
                        <h4 class="card-title">Total Biaya</h4>
                        <div class="media">
                            <i class="mdi mdi-account-box-outline icon-lg text-info d-flex align-self-center me-3"></i>
                            <div class="media-body">
                                <p class="display-3">{{harga(total)}}</p>
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
                                                Tambah Kelas
                                            </button>
                                            <button type="button" class="btn btn-danger btn-sm btn-icon d-md-none ms-2" data-bs-toggle="modal" data-bs-target="#removeRowModal">
                                                <i class="mdi mdi-minus-circle"></i>
                                            </button>
                                            <button class="btn btn-danger d-none d-md-block ms-2" data-bs-toggle="modal" data-bs-target="#removeRowModal" @click="initEdit">
                                                Hapus Kelas
                                            </button>
                                        </div>
                                    </div>
                                    <div v-if="loading" class="loading-page d-flex justify-content-center">
                                        <div>
                                            <img src="~/assets/images/loading.gif" alt="Loading">
                                        </div>
                                    </div>
                                    <div v-else class="table-responsive">
                                        <table id="add-row" class="table table-hover" >
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(row,index) in filteredRows" :key="index">
                                                    <td>{{ row.nama_item }}</td>
                                                    <td>{{ harga(Number(row.harga)) }}</td>
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
                                                    :options="options"
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
                        <div class="modal fade" id="removeRowModal" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    <form @submit.prevent="remove">
                                    <div class="modal-body">
                                        <p class="small">Isi semua kolom berikut ini</p>
                                        <div class="row">
                                            <div class="col-12">
                                                <multiselect
                                                    v-model="selectedItems"
                                                    :options="selectedOptions"
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
                                                    >
                                                </multiselect>
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
        loading: false,
        filter: '',
        selectedRekening: {},
        total: 0,
        rows: [],
        items: [],
        options: [],
        baseOptions: [],
        selectedOptions: [],
        rekening: [],
        selected: [],
        selectedItems: [],
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
                const nama_item = row.nama_item.toLowerCase();
                const harga = row.harga.toString().toLowerCase();
                const searchTerm = this.filter.toLowerCase();

                return nama_item.includes(searchTerm) || 
                harga.includes(searchTerm);
            });
        }
    },
    methods: {
        initialize() {
            this.loading = true;
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const detail = baseURL + '/api/rekening/' + this.rekeningId
            const biaya = baseURL + '/api/rekening/total/' + this.rekeningId
            const rekening = baseURL + '/api/kelas/rekening/' + this.rekeningId
            const selectAPI = baseURL + '/api/kelas/selected/' + this.rekeningId
            const optionAPI = baseURL + '/api/kelas/option/' + this.rekeningId

            axios.get(detail, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.selectedRekening = response.data.data
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(biaya, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.total = Number(response.data.data.total)
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(rekening, {
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

            axios.get(selectAPI, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.selectedOptions = response.data.data;
                this.baseOptions = this.selectedOptions;
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(optionAPI, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.options = response.data.data;
            })
            .catch(error => {
                console.log(error)
            })

            this.loading = false;
        },
        save(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rincian-rekening'

            e.preventDefault()

            this.selected.forEach((item, index) => {
                axios.post(apiURL, {
                    rekening_id: this.rekeningId,
                    item_id: item.id
                },{
                    headers: {
                        'Authorization': token
                    }
                }).then(response => {
                    if (index == this.selected.length - 1) { 
                        document.querySelector("#addRowModal").modal('hide');
                        this.selected = [];
                        this.initialize();
                    }
                })
                .catch(error => {
                    console.log(error)
                });
            });

            
        },
        initEdit() {
            this.selectedItems = this.selectedOptions
        },
        remove(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/rincian-rekening/r/' + this.rekeningId + '/i/'

            e.preventDefault()

            const removed = this.baseOptions.filter(arr1Item => !this.selectedItems.some(arr2Item => arr2Item.nama == arr1Item.nama));

            removed.forEach((item, index) => {
                axios.delete(apiURL + item.id,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(response => {
                    if (index == removed.length - 1) { 
                        document.querySelector("#removeRowModal").modal('hide');
                        this.initialize();
                    }
                })
                .catch(error => {
                    console.log(error)
                });
            });
        },
        harga(number){
            if(number != '' && number != undefined){
                return number.toLocaleString('id', { style: 'currency', currency: 'IDR' })
            }else{
                return "-"
            }
            
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