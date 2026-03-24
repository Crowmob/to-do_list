import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Divider, TextField, Typography, Checkbox } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

import { useDeleteTaskMutation, useUpdateTaskMutation } from "../api/apiTasks";
import type { Task } from '../types/task.ts'

type TaskProps = Task & {
    taskId: number;
}

const priorityColors: Record<number, string> = {
    1: "#d32f2f",
    2: "#f57c00",
    3: "#fbc02d",
    4: "#7cb342",
    5: "#90a4ae"
}

const TaskComponent = (task: TaskProps) => {
    const { t } = useTranslation();
    const [showTaskActions, setShowTaskActions] = useState(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTaskName, setNewTaskName] = useState<string>(task.name);
    const [newTaskPriority, setNewTaskPriority] = useState<number>(task.priority);
    const ref = useRef<HTMLDivElement>(null);
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const handleDeleteTask = async () => {
        await deleteTask({ taskId: task.taskId });
        setShowTaskActions(false);
    }

    const handleDiscardChanges = useCallback(() => {
        setEditMode(false);
        setNewTaskName(task.name);
        setNewTaskPriority(task.priority);
    }, [task.name, task.priority])

    const handleUpdateTask = async () => {
        await updateTask({ name: newTaskName, priority: newTaskPriority, taskId: task.taskId, completed: task.completed, category: task.category })
        setShowTaskActions(false);
        setEditMode(false);
    }

    const handleUpdateChecbox = async () => {
        await updateTask({ name: newTaskName, priority: newTaskPriority, taskId: task.taskId, completed: !task.completed, category: task.category });
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node) ) {
                setShowTaskActions(false);
                handleDiscardChanges();
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [handleDiscardChanges]);

    return (
        <>
            <Box ref={ref} sx={{ borderLeft: `6px solid ${priorityColors[task.priority]}`, borderRadius: 2 }}>
                <Box
                    sx={{
                        borderRadius: 2,
                        p: 1,
                        ...( !showTaskActions && {
                            "&:hover": { backgroundColor: "gray", cursor: "pointer" }
                        })
                    }}
                    onClick={() => setShowTaskActions(true)}
                >
                    <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
                        <Checkbox
                            checked={task.completed}
                            onChange={handleUpdateChecbox} 
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            sx={{
                                color: "#82492E",
                                "&.Mui-checked": { color: "#82492E" }
                            }}
                        />

                        <Typography>{task.id}.</Typography>

                        {!editMode ? (
                            <Typography sx={{ flex: 1, wordBreak: "break-word" }}>
                                {task.name}
                            </Typography>
                        ) : (
                            <>
                                <TextField
                                    multiline
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value.length <= 200 ? e.target.value : newTaskName)}
                                    size="small"
                                    inputProps={{ maxLength: 200 }}
                                />
                                <TextField 
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(parseInt(e.target.value) <= 5 ? parseInt(e.target.value) : newTaskPriority)}
                                    type="number"
                                    size="small"
                                    InputProps={{
                                        inputProps: { min: 1, max: 5 }
                                    }}
                                />
                            </>
                        )}
                    </Box>
                </Box>

                {showTaskActions && 
                    <Box sx={{ display: "flex", columnGap: 1, pl: 2 }}>
                        {editMode ? (
                            <>
                                <Button variant="contained" sx={{ backgroundColor: "#D4AF9F" }} onClick={handleUpdateTask}>{t("save")}</Button>
                                <Button color="error" variant="contained" onClick={handleDiscardChanges}>{t("discard")}</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="contained" sx={{ backgroundColor: "#D4AF9F" }} onClick={() => setEditMode(true)}>{t("edit")}</Button>
                                <Button color="error" variant="contained" onClick={handleDeleteTask}>
                                    <DeleteForeverOutlinedIcon />
                                </Button>
                            </>
                        )}
                    </Box>   
                }
            </Box>

            <Divider />
        </>
    );
};

export default TaskComponent;