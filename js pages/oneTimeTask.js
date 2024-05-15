// Correct import of Composition API functions
const { createApp, ref, reactive, onMounted, computed } = Vue;

import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.12/+esm';

import Sidbar from "../componant/sidbar.js";



// Define Vue component using Composition API
const App = {
  setup() {
    // Define a reactive variable to store the message
    const state = reactive({
      oneTasks: [],
      projects: [],
      status: [],
      emps: [],
      comments: [],
      user: localStorage.getItem("myCode"),
    });

    const formValue = reactive({
      name: "",
      description: "",
      project: "",
      start: "",
      deadline: "",
      emp: "",
      supervisor: "",
      // comment: "",
    });
    const formvalid = computed(() => {
      if (
        formValue.name &&
        formValue.description &&
        formValue.project &&
        formValue.emp &&
        formValue.supervisor
        // formValue.comment
        // formValue.start &&
        // formValue.deadline
      ) {
        return true;
      } else {
        return false;
      }
    });

    const commentValue = reactive({
      comment: "",
    });

    const commentvalid = computed(() => {
      if (commentValue.comment) {
        return true;
      } else {
        return false;
      }
    });

    // https://srm-vbc7.onrender.com/api/comments


    // Fetch the emps using the token
    const fetchEmps = async () => {
      const baseUrl = `https://srm-vbc7.onrender.com/api/emps?populate=*`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      state.emps = data.data.map((code) => ({
        code: code.attributes.code,
      }));

      console.log(state.emps);
    };

    // Call the fetchprojects function on component mount
    onMounted(fetchEmps);

    // Fetch the projects using the token
    const fetchProjects = async () => {
      const placeholderglow = document.querySelector(".placeholder-glow");

      placeholderglow.classList.remove("d-none");
      const baseUrl = `https://srm-vbc7.onrender.com/api/projects`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      state.projects = data.data.map((project) => ({
        name: project.attributes.name,
      }));

      console.log(state.projects);
      placeholderglow.classList.add("d-none");
    };

    // Call the fetchprojects function on component mount
    onMounted(fetchProjects);

    // Fetch the tasks using the token
    const fetchTasks = async () => {
      const placeholderglow = document.querySelector(".placeholder-glow");
      placeholderglow.classList.remove("d-none");
      const baseUrl = `https://srm-vbc7.onrender.com/api/onetasks`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      state.oneTasks = data.data;
      console.log(state.oneTasks);
      placeholderglow.classList.add("d-none");
    };

    // Call the fetchtasks function on component mount
    onMounted(fetchTasks);

    const filter = ref("");

    const search = ref("");

    const onFlterTask = (value) => {
      filter.value = value;
      console.log(filter.value);
    };


    const filterTask = computed(() => {
      return state.oneTasks.filter(
        (task) =>
          (!filter.value || filter.value === "inbox"
            ? !task.attributes.is_archive
            : filter.value === "archive"
              ? task.attributes.is_archive
              : filter.value === "star"
                ? task.attributes.is_star
                : filter.value === "own"
                  ? task.attributes.taskOwner === state.user
                  : false) &&
          task.attributes.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });


    const fetchComment = async () => {
      const baseUrl = `https://srm-vbc7.onrender.com/api/comments`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      state.comments = data.data;
      console.log(state.comments);
    };

    // Call the fetchtasks function on component mount
    onMounted(fetchComment);



    // const filterComment = computed(() => {
    //   if (selectedTask.value) {
    //     return state.comments.filter(
    //       (comment) => comment.attributes.taskID === selectedTask.value.id
    //     );
    //   }
    //   return [];
    // });



    // console.log(filterComment.value);




    const spinnerShow = ref(false);
    const advancedSettingShow = ref(false);
    const commentShow = ref(false);
    const successMsg = ref(false);
    const successMsgReply = ref(false);
    const errorMsg = ref(false);
    const errorMsgReply = ref(false);
    const modalShow = ref(false);
    const spinnerShowIds = ref({});
    const trashShow = ref({});
    const restoreShow = ref({});

    // Function to delete a task
    const archivetask = async (id) => {
      const isArchive = state.oneTasks.find((task) => task.id === id).attributes.is_archive;
      const confirmed = confirm(`Are you sure you want to ${!isArchive ? "archive" : "restore"} this task? `);

      if (!confirmed) {
        trashShow.value[id] = true;
        restoreShow.value[id] = true;
        spinnerShowIds.value[id] = false;
        return;
      }

      if (confirmed) {
        spinnerShowIds.value[id] = true;
        const baseUrl = `https://srm-vbc7.onrender.com/api/onetasks/${id}`;
        const token =
          "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
        await fetch(baseUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              is_archive: !isArchive,
            },
          }),
        });
        spinnerShowIds.value[id] = false;

        await fetchTasks();
      }
    };


    const starTask = async (id) => {
      const baseUrl = `https://srm-vbc7.onrender.com/api/onetasks/${id}`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";

      const task = state.oneTasks.find((task) => task.id === id);
      const isStar = task.attributes.is_star;

      await fetch(baseUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            is_star: !isStar,
          },
        }),
      });

      await fetchTasks();

    }

    // // Function to create a new task

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };


    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const time = hour >= 12 ? " pm" : " pm";
      return `${day} ${month}, ${year} at ${hour}:${min}${time}`;
    };

    const postData = async (data) => {
      spinnerShow.value = true;

      const user = localStorage.getItem("myCode");

      const url = `https://srm-vbc7.onrender.com/api/onetasks`;
      // const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: formValue.name,
            description: formValue.description,
            taskOwner: user,
            project: formValue.project,
            // status: "open",
            // taskType: taskList,
            start: formValue.start,
            deadline: formValue.deadline,
            assign_to: formValue.emp,
            supervisor: formValue.supervisor,
          },
        }),
      })
        // await fetch(url2, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     data: {
        //       name: newName,
        //       description: newDescription,
        //       createby: user,
        //       status: "open",
        //       taskType: taskList,
        //       from: taskStartTime,
        //       to: taskEndTime,
        //     },
        //   }),
        // })
        .then((result) => {
          // Handle success
          successMsg.value = true;
          setTimeout(() => {
            successMsg.value = false;
          }, 3000);
        })
        .catch((error) => {
          // Handle error
          errorMsg.value = true;
          setTimeout(() => {
            errorMsg.value = false;
          }, 3000);
        });
      modalShow.value = false;
      await fetchTasks();
      spinnerShow.value = false;
    };

    const postComment = async (id) => {
      console.log(typeof id);
      spinnerShow.value = true;
      const url = `https://srm-vbc7.onrender.com/api/comments`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            taskID: id,
            comment: commentValue.comment,
            user: state.user,
          },
        }),
      })
        .then((result) => {
          // // Handle success
          // successMsgReply.value = true;
          // setTimeout(() => {
          //   successMsgReply.value = false;
          // }, 3000);
          notify();
        })
        .catch((error) => {
          // // Handle error
          // errorMsgReply.value = true;
          // setTimeout(() => {
          //   errorMsgReply.value = false;
          // }, 3000);
        });

      await fetchComment();
      spinnerShow.value = false;
    }


    // // Function to edit a task
    // const edittask = async (taskId) => {
    //   try {
    //     const url = `https://srm-vbc7.onrender.com/api/tasks/${taskId}`;
    //     const token =
    //       "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";

    //     const data = await (
    //       await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    //     ).json();

    //     const task = data.data;

    //     const modal = document.createElement("div");
    //     modal.classList.add("modal", "fade");
    //     modal.setAttribute("id", "taskNameModal");
    //     modal.setAttribute("tabindex", "-1");
    //     modal.setAttribute("role", "dialog");
    //     modal.setAttribute("aria-labelledby", "taskNameModalLabel");
    //     modal.setAttribute("aria-hidden", "true");

    //     const modalDialog = document.createElement("div");
    //     modalDialog.classList.add("modal-dialog", "modal-dialog-centered");

    //     const modalContent = document.createElement("div");
    //     modalContent.classList.add("modal-content");

    //     const modalHeader = document.createElement("div");
    //     modalHeader.classList.add("modal-header");
    //     modalHeader.innerHTML = `<h5 class="modal-title" id="taskNameModalLabel">Edit task</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

    //     const modalBody = document.createElement("div");
    //     modalBody.classList.add("modal-body");
    //     modalBody.innerHTML = `<form>
    //     <label for="taskName">task name:</label><input type="text" id="taskName" class="form-control" value="${task.attributes.name}">
    //     <label for="taskDescription">task description:</label><input type="text" id="taskDescription" class="form-control" value="${task.attributes.description}">
    //     </form>`;

    //     const modalFooter = document.createElement("div");
    //     modalFooter.classList.add("modal-footer");
    //     modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="updateButton">Update</button>`;

    //     modalContent.appendChild(modalHeader);
    //     modalContent.appendChild(modalBody);
    //     modalContent.appendChild(modalFooter);
    //     modalDialog.appendChild(modalContent);
    //     modal.appendChild(modalDialog);

    //     document.body.appendChild(modal);

    //     const taskNameModal = new bootstrap.Modal(modal);
    //     taskNameModal.show();
    //     const spinner = document.createElement("span");
    //     spinner.classList.add(
    //       "spinner-border",
    //       "spinner-border-sm",
    //       "ms-2",
    //       "d-none"
    //     );
    //     spinner.setAttribute("role", "status");
    //     spinner.setAttribute("aria-hidden", "true");
    //     modal.querySelector("#updateButton").appendChild(spinner);

    //     modal
    //       .querySelector("#updateButton")
    //       .addEventListener("click", async (e) => {
    //         spinner.classList.remove("d-none");
    //         e.preventDefault();
    //         const newName = modal.querySelector("#taskName").value;
    //         const newDescription = modal.querySelector(
    //           "#taskDescription"
    //         ).value;
    //         if (newName === task.attributes.name) {
    //           return;
    //         }

    //         await fetch(url, {
    //           method: "PUT",
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             data: {
    //               ...task.attributes,
    //               name: newName,
    //               description: newDescription,
    //             },
    //           }),
    //         });

    //         const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;
    //         const alertMsg = document.querySelector(".alertMsg");

    //         const user = localStorage.getItem("myCode");

    //         await fetch(url2, {
    //           method: "POST",
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             data: {
    //               name: newName,
    //               description: newDescription,
    //               editby: user,
    //             },
    //           }),
    //         })
    //           .then((result) => {
    //             // Handle success
    //             alertMsg.classList.add("alert", "alert-success");
    //             alertMsg.innerHTML =
    //               "<strong>Success!</strong> task updated successfully.";
    //             alertMsg.style.display = "block";
    //             alertMsg.style.width = "25%";
    //             alertMsg.style.position = "fixed";
    //             alertMsg.style.top = "0";
    //             alertMsg.style.left = "38%";
    //             alertMsg.style.margin = "20px";
    //             alertMsg.style.transition = "all 0.5s ease-in-out";
    //             alertMsg.style.opacity = "0";
    //             setTimeout(function () {
    //               alertMsg.style.opacity = "1";
    //             }, 10);
    //             setTimeout(function () {
    //               alertMsg.style.display = "none";
    //             }, 2000);
    //           })
    //           .catch((error) => {
    //             // Handle error
    //             alertMsg.classList.add("alert", "alert-danger");
    //             alertMsg.style.width = "25%";
    //             alertMsg.style.position = "fixed";
    //             alertMsg.style.top = "0";
    //             alertMsg.style.left = "38%";
    //             alertMsg.style.margin = "20px";
    //             alertMsg.style.transition = "all 0.5s ease-in-out";
    //             alertMsg.innerHTML =
    //               "<strong>Error!</strong> An error occurred: " +
    //               error.message +
    //               ". Please try again.";
    //             alertMsg.style.display = "block";
    //             alertMsg.style.opacity = "0";
    //             setTimeout(function () {
    //               alertMsg.style.opacity = "1";
    //             }, 10);
    //             setTimeout(function () {
    //               alertMsg.style.display = "none";
    //             }, 2000);
    //           });

    //         await fetchtasks();
    //         modal.remove();
    //         taskNameModal.hide();
    //         spinner.classList.add("d-none");
    //       });
    //   } catch (error) {
    //     alert("An error occurred while editing the task.");
    //   }
    // };

    // // Function to open or close a task

    // const changeStatus = async (id, status) => {
    //   if (status === "open") {
    //     status = "close";
    //   } else {
    //     status = "open";
    //   }
    //   console.log(status);
    //   const baseUrl = `https://srm-vbc7.onrender.com/api/tasks/${id}`;
    //   const token =
    //     "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    //   const bodyData = {
    //     data: {
    //       status,
    //     },
    //   };
    //   const response = await fetch(baseUrl, {
    //     method: "PUT",
    //     headers: {
    //       ...headers,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bodyData),
    //   });
    //   const statetask = await response.json();
    //   console.log(statetask);
    //   const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;

    //   await fetch(url2, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       data: {
    //         name: statetask.data.attributes.name,
    //         description: statetask.data.attributes.description,
    //         editby: localStorage.getItem("myCode"),
    //         status,
    //       },
    //     }),
    //   });

    //   await fetchtasks();
    // };

    // // Function to show the task description
    // const showModal = (id, description, name) => {
    //   console.log(description);
    //   const modal = document.createElement("div");
    //   modal.classList.add("modal", "fade");
    //   modal.setAttribute("id", "taskDescriptionModal");
    //   modal.setAttribute("tabindex", "-1");
    //   modal.setAttribute("role", "dialog");
    //   modal.setAttribute("aria-labelledby", "taskDescriptionModalLabel");
    //   modal.setAttribute("aria-hidden", "true");
    //   modal.innerHTML = `
    //     <div class="modal-dialog modal-dialog-centered">
    //       <div class="modal-content">
    //         <div class="modal-header">
    //           <h5 class="modal-title" id="taskDescriptionModalLabel">${name}</h5>
    //           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div class="modal-body text-center p-4" style="width:fit-content;">
    //           ${description}
    //         </div>
    //       </div>
    //     </div>
    //   `;
    //   document.body.appendChild(modal);
    //   const taskDescriptionModal = new bootstrap.Modal(modal);
    //   taskDescriptionModal.show();
    // };

    // test toast
    const toastId = ref('');
    const toastIds = ref([]);

    const notify = () => {
      const toastId = toast.success(
        'Comment Added',
        {
          rtl: true,
          limit: 2,
          position: toast.POSITION.TOP_RIGHT,
        },
      );
      this.toastIds.push(toastId);
    };

    const notifyError = () => {
      const toastId = toast.error(
        'Error, Please try again',
        {
          rtl: true,
          limit: 2,
          position: toast.POSITION.TOP_RIGHT,
        },
      );
      this.toastIds.push(toastId);
    };















    // Return the data and functions to be used in the template
    return {
      state,
      formValue,
      fetchProjects,
      fetchTasks,
      formatDate,
      postData,
      advancedSettingShow,
      commentShow,
      spinnerShow,
      successMsg,
      errorMsg,
      modalShow,
      formvalid,
      fetchEmps,
      spinnerShowIds,
      trashShow,
      archivetask,
      onFlterTask,
      filterTask,
      starTask,
      restoreShow,
      // filterTasks,
      // searchTasks,
      search,
      // searchTsk,
      postComment,
      fetchComment,
      successMsgReply,
      errorMsgReply,
      toastId,
      notify,
      toastIds,
      notifyError,
      commentValue,
      commentvalid,
      formatDateTime,
    };
  },
  components: {
    Sidbar,
  },
};


// Register the component with Vue
createApp(App).mount("#app");

