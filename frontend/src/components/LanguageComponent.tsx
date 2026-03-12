import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import uk from "../assets/united-kingdom.png";
import pl from "../assets/poland.png";
import { useTranslation } from "react-i18next";
import { Languages } from "../constants/constants";

const languages: Record<string, string> = {
  en: uk,
  pl: pl
};

const LanguageComponent = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = () => {
    i18n.changeLanguage(i18n.language === Languages.EN ? Languages.PL : Languages.EN);
    handleClose();
  };

  return (
    <Box sx={{ pl: 2 }}>
      <Box
        component="img"
        src={languages[i18n.language]}
        alt={i18n.language}
        width={30}
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { backgroundColor: "#D4AF9F" }}}>
        <MenuItem onClick={() => handleSelect()}>
          <Box component="img" src={i18n.language === Languages.EN ? pl : uk} width={25} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageComponent;