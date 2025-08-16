"use client"
import {MenuImg, MenuPageSection} from "@/app/menu/menuPage.style";

export default () => {
    return (
        <MenuPageSection $isMini={false}>
            <MenuImg src={`${process.env.NEXT_PUBLIC_S3_SERVER_URL}/menu.png`}/>
        </MenuPageSection>
    )
}