import { useMemo, useState } from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useCreateTaskMutation, useGetTasksQuery } from "../api/apiTasks";
import type { RootState } from "../store/store";
import TaskComponent from "../components/Task";

const HomePage = () => {
  const { t }= useTranslation();
  const { isAuthenticated, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const [taskPriority, setTaskPriority] = useState<number>(1);
  const [taskName, setTaskName] = useState<string>("");
  const [taskCategory, setTaskCategory] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [addTask] = useCreateTaskMutation();
  const { data: tasks, isLoading: isTasksLoading } =
    useGetTasksQuery(undefined, { skip: !isAuthenticated });

  const categories = useMemo(() => {
    return [...new Set(tasks?.map(task => task.category) || [])]
      .sort((a, b) => a.localeCompare(b));
  }, [tasks]);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCategory = selected ?? categories[0];

  const activeTasks = tasks?.filter(
    task => !task.completed && task.category === selectedCategory
  );

  const completedTasks = tasks?.filter(
    task => task.completed && task.category === selectedCategory
  );

  const handleAddTask = async () => {
    if (!taskName.trim() || !taskCategory.trim()) {
      setErrorMessage(t("fillAllFields"));
      return;
    } else { 
      setErrorMessage("");
    }
    await addTask({ name: taskName, priority: taskPriority, completed: false, category: taskCategory });
    setTaskName("");
    setTaskPriority(1);
  }

  if (!isAuthChecked || (isAuthenticated && isTasksLoading)) {
    return <Typography>{t("loading")}...</Typography>;
  }

  if (!isAuthenticated) {
    return <Typography>{t("pleaseLogIn")}</Typography>;
  }

  return (
    <>

      {tasks?.length === 0 && (
        <Typography sx={{ p: 1 }}>{t("noTasks")}</Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
        <Box sx={{ border: "5px solid gray", borderRadius: 2, p: 1, width: "fit-content", textAlign: "center" }}>
          <Box sx={{ pb: 1}}>
            <TextField
              label={t("taskName")}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value.length <= 200 ? e.target.value : taskName)}
              inputProps={{ maxLength: 200 }}
            />
            <TextField
              label={t("taskCategory")}
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value.length <= 50 ? e.target.value : taskCategory)}
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              label={t("taskPriority")}
              type="number"
              value = {taskPriority}
              onChange={(e) => {setTaskPriority(parseInt(e.target.value) <= 5 ? parseInt(e.target.value) : taskPriority)}}
              InputProps={{
                inputProps: { min: 1, max: 5 }
              }}
            />
          </Box>
            
          <Button variant="contained" color="primary" sx={{ backgroundColor: "#D4AF9F" }} onClick={handleAddTask}>
            {t("addTask")}
          </Button>
          
          <Typography color="error">{errorMessage}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            clickable
            sx={{
              color: selectedCategory === category ? "#82492E" : "default",
            }}
            onClick={() => setSelected(category)}
          />
        ))}
      </Box>

      {tasks && tasks.length > 0 && (
        <>
          {activeTasks && activeTasks.length > 0 && (
            <Box sx={{ pt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 1,
                  border: "3px solid gray",
                  borderRadius: 5,
                  p: 1
                }}
              >
                {[...activeTasks]
                  .sort((a, b) => a.priority - b.priority)
                  .map((task, index) => (
                    <TaskComponent
                      key={task.id}
                      id={index + 1}
                      taskId={task.id}
                      name={task.name}
                      priority={task.priority}
                      completed={task.completed}
                      category={task.category}
                    />
                ))}
              </Box>
            </Box>
          )}
          {completedTasks && completedTasks.length > 0 && (
            <Box sx={{ pt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 1,
                  border: "3px solid gray",
                  borderRadius: 5,
                  p: 1
                }}
              >
                {[...completedTasks]
                  .sort((a, b) => a.priority - b.priority)
                  .map((task, index) => (
                    <TaskComponent
                      key={task.id}
                      id={index + 1}
                      taskId={task.id}
                      name={task.name}
                      priority={task.priority}
                      completed={task.completed}
                      category={task.category}
                    />
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;