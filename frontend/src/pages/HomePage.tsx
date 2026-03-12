import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useGetTasksQuery } from "../api/apiTasks";
import type { RootState } from "../store/store";

const HomePage = () => {
  const { t }= useTranslation();
  const { isAuthenticated, isAuthChecked } = useSelector((state: RootState) => state.auth);

  const { data: tasks, isLoading: isTasksLoading } = useGetTasksQuery(undefined, { skip: !isAuthenticated });

  if (!isAuthChecked || (isAuthenticated && isTasksLoading)) {
    return <Typography>{t("loading")}...</Typography>;
  }

  if (!isAuthenticated) {
    return <Typography>{t("pleaseLogIn")}</Typography>;
  }

  return (
    <>
      {tasks?.map(task => (
        <Typography key={task.id}>
          {task.name} - Priority: {task.priority}
        </Typography>
      ))}
    </>
  );
};

export default HomePage;