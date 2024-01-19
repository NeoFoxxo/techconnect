import useMediaQuery from "@mui/material/useMediaQuery"

export default function useIsMobile() {
	return useMediaQuery("(min-width:640px)")
}
