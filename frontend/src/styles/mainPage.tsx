import { Box, styled } from "@mui/material";


export const PageContainer = styled(Box)({
    height: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 8fr 2fr",
    gridTemplateRows: "13rem auto",
})

export const LeftColumn = styled(Box)({
    backgroundColor: "#e6edef",
    gridArea: "1 / 1 / 2 / 2",
    height: "6.25rem",
})

export const RightColumn = styled(Box)({
    backgroundColor: "#e6edef",
    height: "6.25rem",
    gridArea: "1 / 3 / 2 / 4",
})

export const PageContent = styled(Box)({
    gridArea: "2 / 2 / 3 / 3",
    overflowy: "scroll",
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
})