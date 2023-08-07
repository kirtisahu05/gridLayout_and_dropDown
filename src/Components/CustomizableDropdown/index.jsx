import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

const CustomizableDropdown = ({ options, multiple = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sortedOptions, setSortedOptions] = useState(options);
  const [sortOrder, setSortOrder] = useState("ASC");

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOptions([]);
    setSortedOptions(options);
  }, [options, multiple]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    if (multiple) {
      if (
        selectedOptions.some(
          (selectedOption) => selectedOption.value === option.value
        )
      ) {
        setSelectedOptions(
          selectedOptions.filter((o) => o.value !== option.value)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleSortOptions = () => {
    const sortedOptions = [...options].sort((a, b) => {
      if (sortOrder === "ASC") {
        setSortOrder("DSC");
        return a.label.localeCompare(b.label);
      } else {
        setSortOrder("ASC");
        return b.label.localeCompare(a.label);
      }
    });

    setSortedOptions(sortedOptions);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="card-div">
        <div className="dropdown-header">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={toggleDropdown}
          />
          {isOpen && (
            <button className="sort-button" onClick={handleSortOptions}>
              Sort-{sortOrder}
            </button>
          )}
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {sortedOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={
                  selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value
                  )
                    ? "selected"
                    : ""
                }
              >
                {option.label}
                {multiple &&
                  selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value
                  ) && (
                    <button
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOptions(
                          selectedOptions.filter(
                            (o) => o.value !== option.value
                          )
                        );
                      }}
                    >
                      &times;
                    </button>
                  )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-div">
        {multiple && selectedOptions.length > 0 && (
          <div className="selected-options">
            <p>Selected Options:</p>
            <ul>
              {selectedOptions.map(({ value, label }) => (
                <li key={value}>{label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizableDropdown;
