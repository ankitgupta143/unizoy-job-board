import { useState, useCallback } from "react";
import { initialJobs } from "../data/mockData";

export function useJobs() {
  const [jobs, setJobs] = useState(initialJobs);

  const addJob = useCallback((jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      postedAt: new Date().toISOString().split("T")[0],
      status: "active",
      applications: [],
    };
    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  }, []);

  const updateJob = useCallback((id, updates) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updates } : job))
    );
  }, []);

  const deleteJob = useCallback((id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }, []);

  const applyToJob = useCallback((jobId, application) => {
    const newApplication = {
      ...application,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, applications: [...job.applications, newApplication] }
          : job
      )
    );
    return newApplication;
  }, []);

  const getJob = useCallback(
    (id) => jobs.find((job) => job.id === id),
    [jobs]
  );

  return { jobs, addJob, updateJob, deleteJob, applyToJob, getJob };
}