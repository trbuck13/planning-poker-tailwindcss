import React, { useMemo } from "react";
import PropTypes from "prop-types";
/** components */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
/** style */

const Sidebar = ({ tasks }) =>
  useMemo(
    () => (
      <>
        <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div class="px-4 py-5 sm:px-6">Voted Tasks</div>
          <div class="px-4 py-5 sm:p-6">
            <ul class="divide-y divide-gray-200">
              {tasks
                .map((item, idx) => (
                  <li class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <div class="flex justify-between space-x-3">
                      <div class="min-w-0 flex-1">
                        <a href="#" class="block focus:outline-none">
                          <span
                            class="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            <span>Avg:</span> {item.average}
                          </p>
                        </a>
                      </div>
                      <time
                        datetime="2021-01-27T16:35"
                        class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                      >
                        {item?.date && (
                          <div>
                            {item.date.toDate().toLocaleDateString("pt-BR", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                          </div>
                        )}
                      </time>
                    </div>
                  </li>
                ))
                .reverse()}
            </ul>
          </div>
        </div>
      </>
    ),
    [tasks]
  );

Sidebar.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Sidebar;
