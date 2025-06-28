document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== "") {
        fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            userList.innerHTML = "";
            reposList.innerHTML = "";
            data.items.forEach((user) => {
              const li = document.createElement("li");
              li.innerHTML = `
                <img src="${user.avatar_url}" width="50" />
                <strong>${user.login}</strong>
                <a href="${user.html_url}" target="_blank">View Profile</a>
              `;
              li.style.cursor = "pointer";
              li.addEventListener("click", () => fetchRepos(user.login));
              userList.appendChild(li);
            });
          });
      }
    });
  
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((res) => res.json())
        .then((repos) => {
          reposList.innerHTML = "";
          repos.forEach((repo) => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(li);
          });
        });
    }
  });
  