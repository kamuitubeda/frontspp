<template>
	<div class="container-scroller">
		<!-- partial:partials/_navbar.html -->
		<Navbar></Navbar>
		<!-- partial -->
		<div class="container-fluid page-body-wrapper">
			<!-- partial:partials/_settings-panel.html -->
			<Setting></Setting>
			<Right></Right>
			<!-- partial -->
			<!-- partial:partials/_sidebar.html -->
			<Sidebar></Sidebar>
			<!-- partial -->
			<div class="main-panel">
				<div class="content-wrapper">
					<nuxt/>
				</div>
				<!-- content-wrapper ends -->
				<!-- partial:partials/_footer.html -->
				<Footer></Footer>
				<!-- partial -->
			</div>
			<!-- main-panel ends -->
		</div>
    </div>
</template>

<script>
	import Navbar from '@/components/layouts/Navbar.vue'
	import Setting from '@/components/layouts/Setting.vue'
	import Right from '@/components/layouts/Right.vue'
	import Sidebar from '@/components/layouts/Sidebar.vue'
	import Footer from '@/components/layouts/Footer.vue'

	export default {
		components: {
			'Navbar': Navbar,
			'Setting': Setting,
			'Right': Right,
			'Sidebar': Sidebar,
			'Footer': Footer
		},
	}
</script>