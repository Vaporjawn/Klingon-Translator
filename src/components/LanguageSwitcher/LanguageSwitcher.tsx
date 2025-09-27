import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "tlh" : "en";
    i18n.changeLanguage(newLang);
  };

  const tooltipText =
    i18n.language === "en"
      ? t("language_switch")
      : t("language_switch_english");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 100, // Move to the left of the translate button
        zIndex: 1000,
      }}
    >
      <Tooltip title={tooltipText} arrow>
        <Fab
          color="primary"
          aria-label={t("language_switch_aria")}
          onClick={toggleLanguage}
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              transform: "scale(1.05)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.5rem",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Language />
        </Fab>
      </Tooltip>
    </motion.div>
  );
};

export default LanguageSwitcher;
