<template>
	<div>
        <Header></Header>
        <Sidebar></Sidebar>
        <main id="main" class="main">
            <nuxt/>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
	import Sidebar from '@/components/layouts/Sidebar.vue'
	import Header from '@/components/layouts/Header.vue'
	import Footer from '@/components/layouts/Footer.vue'

	export default {
		components: {
			'Sidebar': Sidebar,
			'Header': Header,
			'Footer': Footer
		},
	}
</script>