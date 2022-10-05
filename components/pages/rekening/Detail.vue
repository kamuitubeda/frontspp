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
                                    <p class="display-3">{{kelas.nama}}</p>
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
                                            <tbody v-for="(row,index) in filteredRows" :key="index">
                                                <tr>
                                                    <td>{{ row.nama }}</td>
                                                    <td>{{ row.alamat }}</td>
                                                    <td>{{ row.nama_wali }}</td>
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
                                            Kelas</span> 
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
                                                    <label>Jenjang Kelas</label>
                                                    <input id="jenjang" type="text" class="form-control" v-model="simpan.jenjang" placeholder="7" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="form-group">
                                                    <label>Nama Ruang Kelas</label>
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
        kelas: {},
        simpan: {
            tapel: '',
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
            const kelas = baseURL + '/api/kelas/' + this.kelasId
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
            const apiURL = baseURL + '/api/kelas'

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
        }
    }
}
</script>