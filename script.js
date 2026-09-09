const tabs =
  document.querySelectorAll(".tab");

const panels =
  document.querySelectorAll(".panel");

const openButtons =
  document.querySelectorAll("[data-open]");

const statusText =
  document.querySelector("#status-text");


function setPanel(
  targetId,
  updateHistory = true
) {

  const targetPanel =
    document.getElementById(targetId);

  const targetTab =
    document.querySelector(
      `.tab[data-target="${targetId}"]`
    );


  if (!targetPanel) {
    return;
  }


  panels.forEach((panel) => {

    panel.classList.remove("active");

  });


  tabs.forEach((tab) => {

    tab.classList.remove("active");

  });


  targetPanel.classList.add("active");


  if (targetTab) {

    targetTab.classList.add("active");

  }


  if (statusText) {

    statusText.textContent =
      `opened: ${targetId}`;

  }


  if (updateHistory) {

    history.replaceState(
      null,
      "",
      `#${targetId}`
    );

  }

}


function openPanel(targetId) {

  setPanel(
    targetId,
    true
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


tabs.forEach((tab) => {

  tab.addEventListener(
    "click",
    () => {

      openPanel(
        tab.dataset.target
      );

    }
  );

});


openButtons.forEach((button) => {

  button.addEventListener(
    "click",
    (event) => {

      const targetId =
        button.dataset.open;


      if (!targetId) {
        return;
      }


      if (
        button.tagName === "A"
      ) {

        event.preventDefault();

      }


      openPanel(targetId);

    }
  );

});


function openFromHash() {

  const hash =
    window.location.hash
      .replace("#", "");


  const panel =
    document.getElementById(hash);


  if (
    panel &&
    panel.classList.contains("panel")
  ) {

    setPanel(
      hash,
      false
    );

  } else {

    setPanel(
      "main",
      false
    );

  }

}


openFromHash();


window.addEventListener(
  "hashchange",
  openFromHash
);


const year =
  document.querySelector("#year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}


const lastUpdate =
  document.querySelector(
    "#last-update"
  );


if (lastUpdate) {

  const modified =
    new Date(
      document.lastModified
    );


  lastUpdate.textContent =
    modified
      .toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      )
      .toLowerCase();

}


const interactiveElements =
  document.querySelectorAll(
    ".tab, .retro-button, .project-link, .external-link, .resume-main-link, .resume-download"
  );


interactiveElements.forEach(
  (element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        if (!statusText) {
          return;
        }


        if (element.dataset.target) {

          statusText.textContent =
            `tab: ${element.dataset.target}`;

          return;

        }


        if (element.dataset.open) {

          statusText.textContent =
            `open: ${element.dataset.open}`;

          return;

        }


        if (
          element.classList.contains(
            "project-link"
          )
        ) {

          statusText.textContent =
            "open github repository";

          return;

        }


        if (
          element.classList.contains(
            "external-link"
          )
        ) {

          statusText.textContent =
            "external link";

          return;

        }


        if (
          element.classList.contains(
            "resume-main-link"
          )
        ) {

          statusText.textContent =
            "open resume.pdf";

          return;

        }


        if (
          element.classList.contains(
            "resume-download"
          )
        ) {

          statusText.textContent =
            "download resume.pdf";

        }

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        if (statusText) {

          statusText.textContent =
            "ready";

        }

      }
    );

  }
);


const windowControls =
  document.querySelectorAll(
    ".window-controls button"
  );


windowControls.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      if (statusText) {

        statusText.textContent =
          "this button does nothing :)";

      }

    }
  );

});