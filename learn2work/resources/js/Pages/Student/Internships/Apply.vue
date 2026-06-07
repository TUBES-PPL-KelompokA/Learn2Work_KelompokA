<script setup>
import { useForm } from '@inertiajs/vue3';

defineProps({
    company: Object // Data perusahaan dilempar dari controller saat klik "Apply"
});

const form = useForm({ 
    partner_company_id: company.id, 
    cv_file: null
});

const submitApplication = () => {
    form.post(route('internships.store'), { // Pastikan name route sesuai di web.php
        preserveScroll: true,
        onSuccess: () => form.reset('cv_file')
    });
}; 
</script>

<template>
    <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h2 class="text-xl font-bold mb-2">
            Lamar Magang di {{ company.name }}
        </h2>

        <div 
            v-if="$page.props.flash.success" 
            class="p-4 mb-4 text-green-700 bg-green-100 rounded text-sm"
        >
            {{ $page.props.flash.success }}
        </div>

        <form @submit.prevent="submitApplication">
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">
                    Upload CV (PDF)
                </label>

                <input
                    type="file"
                    @input="form.cv_file = $event.target.files[0]"
                    accept=".pdf"
                    class="w-full border p-2 rounded"
                    required
                >

                <div
                    v-if="form.errors.cv_file"
                    class="text-red-500 text-xs mt-1"
                >
                    {{ form.errors.cv_file }}
                </div>
            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                :disabled="form.processing"
            >
                {{ form.processing ? 'Mengirim...' : 'Kirim Lamaran' }}
            </button>
        </form>
    </div>
</template>
