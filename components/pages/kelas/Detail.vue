<template>
    <div>
        <div class="pagetitle">
        <h1 class="display-3">Kelas</h1>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink to="/kelas">Kelas</NuxtLink></li>
            <li class="breadcrumb-item active">Detail</li>
        </ol>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">
                <div class="row">
                    <div class="col-md-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                            <h4 class="card-title">Nama Kelas</h4>
                            <div class="media">
                                <i class="mdi mdi-domain icon-lg text-info d-flex align-self-start me-3"></i>
                                <div class="media-body">
                                    <p class="display-3">{{kelasTerpilih.nama}}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                            <h4 class="card-title">Jumlah Santri</h4>
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
                            <div class="d-flex justify-content-between">
                                <div class="col-sm-6 col-md-4 d-flex justify-content-start">
                                    <input type="text" class="form-control ms-2" placeholder="Masukkan kata kunci" v-model="filter" />
                                </div>
                                <div class="col-md-4 d-flex justify-content-end">
                                    <button type="button" class="btn btn-primary btn-sm btn-icon d-md-none" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                        <i class="mdi mdi-plus-circle"></i>
                                    </button>
                                    <button class="btn btn-primary d-none d-md-block" data-bs-toggle="modal" data-bs-target="#addRowModal">
                                        Tambah Santri
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="table-responsive">
                                        <table id="add-row" class="table table-hover" >
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Alamat</th>
                                                    <th>Nama Wali</th>
                                                    <th class="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(row,index) in filteredRows" :key="index">
                                                    <td>{{ row.nama }}</td>
                                                    <td>{{ row.alamat }}</td>
                                                    <td>{{ row.nama_wali }}</td>
                                                    <td>
                                                        <div class="text-center">
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
                                            Santri</span> 
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
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nomor Induk</label>
                                                    <input id="simpan-nomor-induk" type="text" class="form-control" v-model="simpan.nomor_induk" placeholder="7" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nama</label>
                                                    <input id="simpan-nama" type="text" class="form-control" v-model="simpan.nama" placeholder="A" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Alamat</label>
                                                    <input id="simpan-alamat" type="text" class="form-control" v-model="simpan.alamat" placeholder="A" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nomor Telepon</label>
                                                    <input id="simpan-telepon" type="number" class="form-control" v-model="simpan.telepon" placeholder="0812345654321">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nama Wali</label>
                                                    <input id="simpan-nama-wali" type="text" class="form-control" v-model="simpan.nama_wali" placeholder="A" required>
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
                                            Santri</span> 
                                            <span class="fw-light">
                                                Edit
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
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Kelas</label>
                                                    <select v-model="edit.kelas_id" name="edit-kelas-id" id="edit-kelas-id" class="form-control" tabindex="12">
                                                        <option v-for="(row) in kelas" :key="row.id" :value="row.id">Kelas {{ row.nama }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nomor Induk</label>
                                                    <input id="edit-nomor-induk" type="text" class="form-control" v-model="edit.nomor_induk" placeholder="20220001" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nama</label>
                                                    <input id="edit-nama" type="text" class="form-control" v-model="edit.nama" placeholder="Ahmad Kurniawan" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Alamat</label>
                                                    <input id="edit-alamat" type="text" class="form-control" v-model="edit.alamat" placeholder="Bangilan - Tuban" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nomor Telepon</label>
                                                    <input id="edit-telepon" type="number" class="form-control" v-model="edit.telepon" placeholder="0812345654321">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>Nama Wali</label>
                                                    <input id="edit-nama-wali" type="text" class="form-control" v-model="edit.nama_wali" placeholder="Adi Wijaya" required>
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
        filter: '',
        jumlah_santri: 0,
        rows: [],
        kelasTerpilih: {},
        kelas: [],
        kelasId: '',
        santri: [],
        simpan: {
            nomor_induk: '',
            nama: '',
            alamat: '',
            telepon: '',
            nama_wali: '',
            aktif: 1,
            kelas_id: ''
        },
        edit: {
            nomor_induk: '',
            nama: '',
            alamat: '',
            telepon: '',
            nama_wali: '',
            aktif: 1,
            kelas_id: ''
        }
      }
    },
    created(){
        this.kelasId = this.$route.params.id;
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
                const nama_wali = row.nama_wali.toLowerCase();
                const searchTerm = this.filter.toLowerCase();

                return nama.includes(searchTerm) || 
                alamat.includes(searchTerm) ||
                nama_wali.includes(searchTerm);
            });
        }
    },
    methods: {
        initialize() {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const kelas = baseURL + '/api/kelas'
            const kelasTerpilih = baseURL + '/api/kelas/' + this.kelasId
            const santri = baseURL + '/api/santri/kelas/' + this.kelasId

            axios.get(kelas, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.kelas = response.data.data
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(kelasTerpilih, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.kelasTerpilih = response.data.data
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(santri, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }
            ).then(response => {
                this.rows = response.data.data
                this.jumlah_santri = this.rows.length
            })
            .catch(error => {
                console.log(error)
            })
        },
        save(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/santri'

            e.preventDefault()

            this.$axios.post(apiURL, {
                //data yang dikirim ke server
                nomor_induk: this.simpan.nomor_induk,
                nama: this.simpan.nama,
                alamat: this.simpan.alamat,
                telepon: this.simpan.telepon,
                nama_wali: this.simpan.nama_wali,
                aktif: 1,
                kelas_id: this.kelasId
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
        update(e) {
            const token = this.$auth.strategy.token.get()
            const baseURL = process.env.baseURL
            const apiURL = baseURL + '/api/santri/' + this.edit.id

            e.preventDefault()

            this.$axios.put(apiURL, {
                //data yang dikirim ke server
                kelas_id: this.edit.kelas_id,
                nomor_induk: this.edit.nomor_induk,
                nama: this.edit.nama,
                alamat: this.edit.alamat,
                telepon: this.edit.telepon,
                nama_wali: this.edit.nama_wali,
                aktif: 1
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
            const apiURL = baseURL + '/api/santri/' + item.id

            this.$swal.fire({
                title: 'Hapus data santri?',
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
                        this.santri.splice(index, 1);
                        this.initialize();
                    })
                    .catch(error => {
                        //assign validation  
                        this.validation = error.response.data
                    })
                } else if (result.isDenied) {
                    Swal.fire('Santri batal dihapus', '', 'info')
                }
            })
        },
        show(id) {
            this.$router.push('/'+id);
        },
        clearInput() {
            this.simpan.jenjang = '';
            this.simpan.ruang = '';
        }
    }
}
</script>