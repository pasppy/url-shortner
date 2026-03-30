"use client"
import { useState } from "react";

export default function useFetch(cb, options = {}) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        setData(null)

        try {
            const res = await cb(options, ...args)
            setData(res);

        } catch (error) {
            setError(error)

        } finally {
            setLoading(false);
        }
    }

    return { loading, data, error, fn };
}
