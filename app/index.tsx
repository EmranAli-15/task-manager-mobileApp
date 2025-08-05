import { useMyProvider } from '@/userProvider/Provider';
import { Redirect } from 'expo-router';
import React from 'react';

export default function index() {
    const { user } = useMyProvider()

    if (!user) return <Redirect href="/(main)/auth"></Redirect>
    return <Redirect href="/(main)/home"></Redirect>
}