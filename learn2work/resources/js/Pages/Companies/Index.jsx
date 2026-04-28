import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ companies }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        industry: '',
        description: '',
        logo_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('companies.store'), { onSuccess: () => reset() });
    };