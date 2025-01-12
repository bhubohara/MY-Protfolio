import { getAllSkills } from "@/store/slice/addSkillSlice";
import { getAllProjects } from "@/store/slice/projectSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Check = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllSkills());
  }, [dispatch]);

  return (
    <div>
      <h1>Count of Projects</h1>
      <h3>projetcs are : {projects ? projects.length : "UNABLE TO COUNT "}</h3>
      <h4>skills : {skills && skills.length}</h4>
    </div>
  );
};

export default Check;
