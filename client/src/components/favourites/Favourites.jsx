import { useState } from "react";
export default function Favourites({favourites, handleDefaultSelect}) {
    return (
        <div>
            <h1 className="text-2xl ">Favourites</h1>
            <ul>
                {Object.entries(favourites).map(([code, name]) => (
                    <li key={code}>
                        <a href="#" onClick={() => handleDefaultSelect(code)}>{name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}