import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useSession, signIn, signOut, getSession} from "next-auth/react"
import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import Form from '../components/Form'

export default function Home() {
    const [data, setData] = useState([])


    const fetchData = async () => {
        const response = await fetch('/api/customer/customer')
        const data = await response.json()
        setData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(data)
    const {data: session, status} = useSession()
    if (status === "authenticated") {
        return (
            <div>
                <Head>
                    <title>Create Next App</title>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Layout>
                    <main>
                        <table className="table-auto w-full">
                            <thead className='bg-gray-50 border-b-2 border-gray-200'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>RM</th >
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left' >NAMA</th >
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NAMA KK</th >
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>ALAMAT</th >
                                </tr>
                            </thead>
                            <tbody> {
                                data ?. map(custemer => (
                                    <tr key={ custemer}>
                                        <td className="p-3 text-sm text-gray-700">{
                                            custemer.rm
                                        }</td>
                                        <td className="p-3 text-sm text-gray-700">{
                                            custemer.nama
                                        }</td>
                                        <td className="p-3 text-sm text-gray-700">{
                                            custemer.namakk
                                        }</td>
                                        <td className="p-3 text-sm text-gray-700">{
                                            custemer.alamat
                                        }</td>

                                    </tr>
                                ))
                            } 
                            </tbody>
                        </table>
                    </main>
                </Layout>


            </div>
        )
    } else {
        return (
            <div>You are not signIn</div>
        )
    }
}

export const getServerSideProps = async (contex) => {
    const session = await getSession(contex)

    if (! session) {
        return {
            redirect: {
                destination: "/login"
            }
        }
    }
    return {props: {
            session
        }}

}
