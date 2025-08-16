'use client'
import styled from "styled-components";

export const MenuPageSection = styled.section<{ $isMini: boolean }>`
    display: grid;
    grid-template-columns: ${({$isMini}) => $isMini ? "1740fr 180fr" : "1fr"};
    width: 100dvw;
    height: 100dvh;
`;

export const MenuImg = styled.img`
    width: 100%;
    height: 100dvh;
`;