import { Redirect } from 'expo-router';
import React from 'react';

export default function index() {

    const isLoggedIn = false;

    if (!isLoggedIn) {
        return <Redirect href="/(main)/auth"></Redirect>
    }

    return <Redirect href="/(main)/home"></Redirect>
}