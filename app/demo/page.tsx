// Example of using a service in a component, also using a reusable component

import Image from "next/image";

import SimpleButton from "../../components/button";

import styles from "./page.module.css";

import { getProducts } from "@/services/demo";

export default async function DemoPage() {
    const products = await getProducts();

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.productTable}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    width={1000}
                                    height={1000}
                                    className={styles.productImage}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.status}</td>
                            <td>${product.price.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SimpleButton className={styles.demoButton}>Click me!</SimpleButton>
        </div>
    );
}
