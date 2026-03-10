import {
  DropdownIcon,
  InputStar,
} from "../components/SvgContainer/SvgContainer";
import {
  DEFAULT_VALUES,
  VIOLENCE_WORDS,
  VIOLENCE_PHRASES,
  HATE_WORDS,
  DEFAMATION_WORDS,
  HATE_PHRASES,
  DEFAMATION_PHRASES,
  sportsOptions,
  complaintOptions,
  severityOptions,
  customStyles,
} from "../components/data/data";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import "sweetalert2/themes/bulma.css";
import "sweetalert2/themes/material-ui.css";
import "sweetalert2/themes/bootstrap-5.css";
import Select from "react-select";
import Swal from "sweetalert2";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

const SubmitComplain = () => {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    shouldUnregister: true,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const watchedCategory = watch("category");
  const descriptionValue = watch("description", "");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [useManualInput, setUseManualInput] = useState(false);
  const sportDropdownRef = useRef();
  const complaintDropdownRef = useRef();
  const severityDropdownRef = useRef();

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCategory) return;
      // if (!selectedSport || !selectedCategory) return;
      setLoading(true);

      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/default_entities?category=eq.${encodeURIComponent(selectedCategory)}`;
      //  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/default_entities?sport=eq.${encodeURIComponent(
      //    selectedSport,
      //  )}&category=eq.${encodeURIComponent(selectedCategory)}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Fetch error:", text);
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    document.title = "SBB - Submit Complain";
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  const selectOptions = data?.map(item => ({
    value: item?.category_value,
    label: item?.category_value,
  }));

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        sportDropdownRef.current &&
        !sportDropdownRef.current.contains(event.target) &&
        complaintDropdownRef.current &&
        !complaintDropdownRef.current.contains(event.target) &&
        severityDropdownRef.current &&
        !severityDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = tab => {
    setOpenDropdown(tab === openDropdown ? null : tab);
  };

  const handleSelectSport = value => {
    setSelectedSport(value);
    setValue("sport", value, { shouldValidate: true });
    setOpenDropdown(null);
  };

  const handleSelectComplaint = value => {
    setUseManualInput(false);
    setSelectedCategory(value);
    setValue("category", value, { shouldValidate: true });
    setOpenDropdown(null);
  };

  const handleSelectSeverity = value => {
    setSeverity(`${value?.label} (${value?.count})`);
    setValue("severity", value?.count, { shouldValidate: true });
    setOpenDropdown(null);
  };

  /* =============================== DETECTION ENGINE ============================== */

  // const normalize = text =>
  //   text
  //     .toLowerCase()
  //     .replace(/[^\w\s]/g, " ")
  //     .replace(/\s+/g, " ");

  // const matchList = (text, list) =>
  //   list.some(item =>
  //     new RegExp(
  //       `\\b${item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
  //       "i",
  //     ).test(text),
  //   );

  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const matchList = (text, list) => {
    const normalizedText = normalize(text);

    return list.some(item => {
      const normalizedItem = normalize(item);
      const escaped = normalizedItem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      return regex.test(normalizedText);
    });
  };

  const detectModerationType = text => {
    const t = normalize(text);

    // strictest first
    if (matchList(t, VIOLENCE_WORDS) || matchList(t, VIOLENCE_PHRASES))
      return "violence";

    if (matchList(t, HATE_WORDS) || matchList(t, HATE_PHRASES)) return "hate";

    if (matchList(t, DEFAMATION_WORDS) || matchList(t, DEFAMATION_PHRASES))
      return "defamation";

    return null;
  };

  const fullFormReset = () => {
    reset(DEFAULT_VALUES);
    setSelectedSport("");
    setSelectedCategory("");
    setSeverity("");
    setOpenDropdown(null);
  };

  const onSubmit = async data => {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ip = (await ipRes.json())?.ip;

    // ALWAYS check block first
    const { data: blockStatus } = await supabase.rpc("check_block_status", {
      p_ip: ip,
    });

    if (blockStatus?.blocked) {
      Swal.fire({
        icon: "error",
        theme: "dark",
        title: "Submission Blocked",
        confirmButtonText: "Ok",
        confirmButtonColor: "#E7000B",
        buttonsStyling: false,
        customClass: {
          actions: "!w-full !flex !px-6",
          confirmButton:
            "!w-full !m-0 !block bg-[#d33] text-white py-2.5 rounded-lg uppercase text-lg font-semibold",
        },
        html: `<p style="font-size:16px">SBB does not allow threats or violent language. Please try after 24 hours</p>`,
      });
      return;
    }

    // ALWAYS check block first
    const { data: limitData } = await supabase.rpc("check_rate_limit", {
      p_ip: ip,
    });

    if (limitData?.warning) {
      Swal.fire({
        icon: "warning",
        title: "Submission warning",
        text: limitData.message,
        confirmButtonColor: "#d33",
      });
    }

    if (limitData?.blocked) {
      Swal.fire({
        icon: "error",
        title: "Too many submissions",
        html: `Please wait 2 minutes and try again. <br/><br/> <p style="font-size:16px">This helps prevent spam</p>`,
        confirmButtonColor: "#d33",
      });
      return;
    }

    const textToCheck = `${data.category_value} ${data.description}`;
    const moderation = detectModerationType(textToCheck);

    if (moderation === "defamation") {
      Swal.fire({
        icon: "warning",
        title: "Rephrase Required",
        html: `<p style="font-size:16px">Your complaint includes language that sounds like a claim of wrongdoing stated as fact. SBB allows strong opinions, but we require wording as an observation or opinion.</p> <br/> <p style="font-size:14px">You can review our <a style="text-decoration:underline" target="_blank" href="/community-guidelines">Community Guidelines</a> & <a style="text-decoration:underline" target="_blank" href="/community-rules">Community Rules</a> on how to submit a complaint</p>`,
        showCancelButton: true,
        theme: "dark",
        confirmButtonText: "Edit Complaint",
        confirmButtonColor: "#E7000B",
      }).then(result => {
        if (result.isConfirmed) {
          console.log("Edit");
        } else {
          fullFormReset();
        }
      });
      return;
    }

    if (moderation === "hate") {
      Swal.fire({
        icon: "error",
        theme: "dark",
        title: "Content Not Allowed",
        html: `<p style="font-size:16px">SBB does not allow hate speech or slurs. Please remove this language to submit your complaint.</p> <br/> <p style="font-size:14px">Repeated violations may result in restrictions.</p>`,
        confirmButtonText: "Edit Complaint",
        buttonsStyling: false,
        customClass: {
          actions: "!w-full !flex !px-6",
          confirmButton:
            "!w-full !m-0 !block bg-[#E7000B] text-white py-2.5 rounded-lg uppercase text-lg font-semibold",
        },
      });
      return;
    }

    if (moderation === "violence") {
      const { data: result } = await supabase.rpc("check_violence_limit", {
        p_ip: ip,
      });

      if (result?.blocked) {
        Swal.fire({
          icon: "error",
          theme: "dark",
          title: "Submission Blocked",
          confirmButtonText: "Ok",
          confirmButtonColor: "#E7000B",
          buttonsStyling: false,
          customClass: {
            actions: "!w-full !flex !px-6",
            confirmButton:
              "!w-full !m-0 !block bg-[#d33] text-white py-2.5 rounded-lg uppercase text-lg font-semibold",
          },
          html: `<p style="font-size:16px">SBB does not allow threats or violent language. Please try after 24 hours</p>`,
        });
        return;
      }

      Swal.fire({
        icon: "warning",
        theme: "dark",
        title: "Submission Warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#E7000B",
        buttonsStyling: false,
        customClass: {
          actions: "!w-full !flex !px-6",
          confirmButton:
            "!w-full !m-0 !block bg-[#d33] text-white py-2.5 rounded-lg uppercase text-lg font-semibold",
        },
        html: `<p style="font-size:16px">SBB does not allow threats or violent language. Please remove this content to submit</p> <br/> <p style="font-size:14px">Repeated violations may result in restrictions</p>`,
      });
      return;
    }

    // const ipRes = await fetch("https://api.ipify.org?format=json");
    // const ip = (await ipRes.json())?.ip;

    // const { data: limitData } = await supabase.rpc("check_rate_limit", {
    //   p_ip: ip,
    // });

    // if (limitData?.warning) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Submission warning",
    //     text: limitData.message,
    //     confirmButtonColor: "#d33",
    //   });
    // }

    // if (limitData?.blocked) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Too many submissions",
    //     html: `Please wait 2 minutes and try again. <br/><br/> <p style="font-size:16px">This helps prevent spam</p>`,
    //     confirmButtonColor: "#d33",
    //   });
    //   return;
    // }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Prefer: "return=representation",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Supabase REST API error:", text);
        return;
      }

      const result = await response.json();
      console.log("Supabase response:", result);

      fullFormReset();
      navigate(`/complaint-filed?id=${result[0]?.id}`);
      console.log("Complaint submitted successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    if (watchedCategory === "Officiating / Referee Call") {
      clearErrors("category_value");
    }
  }, [watchedCategory, clearErrors]);

  return (
    <section className="h-auto pb-[120px] pt-6 w-full bg-black">
      <div className="container flex flex-col gap-y-6 items-center">
        <h2 className="text-[32px] text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
          Submit Complaint Form
        </h2>

        <form
          className="flex w-full relative flex-col gap-y-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full relative flex-col gap-y-6 items-center">
            {/* Sport Dropdown */}
            <div
              className="relative w-full"
              ref={sportDropdownRef}
              onClick={() => handleTabChange("sport")}
            >
              <button
                type="button"
                className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none flex justify-between items-center"
              >
                {selectedSport || "Which sport?"}
                <DropdownIcon />
              </button>

              <input
                type="hidden"
                {...register("sport", { required: "Please select a sport" })}
              />

              {openDropdown === "sport" && (
                <div className="absolute w-[185px] flex mt-2 flex-col py-2 z-9 right-0 bg-[#18181B] rounded-lg shadow-lg">
                  {sportsOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectSport(option)}
                      className={`text-white cursor-pointer ${
                        selectedSport === option ? "bg-[#E7000B]" : ""
                      }`}
                    >
                      <span className="block px-4 py-2">{option}</span>
                      {sportsOptions.length - 1 !== index && (
                        <hr className="border-[0.5px] border-gray-700" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {errors.sport && (
              <span className="text-red-500 text-base w-full">
                {errors.sport.message}
              </span>
            )}

            {/* Category */}
            <div
              className="relative w-full"
              ref={complaintDropdownRef}
              onClick={() => handleTabChange("category")}
            >
              <button
                type="button"
                className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none flex justify-between items-center"
              >
                {selectedCategory || "What is complaint about?"}
                <DropdownIcon />
              </button>

              <input
                type="hidden"
                {...register("category", {
                  required: "Please select a complaint type",
                })}
              />

              {openDropdown === "category" && (
                <div className="absolute z-20 mt-2 right-0 w-62.25 rounded-lg bg-[#18181B]">
                  {complaintOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectComplaint(option)}
                      className={`text-white cursor-pointer ${
                        selectedCategory === option ? "bg-[#E7000B]" : ""
                      }`}
                    >
                      <span className="px-4 py-2 block">{option}</span>
                      {complaintOptions.length - 1 !== index && (
                        <hr className="border-[0.5px] border-gray-700" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {errors.category && (
              <span className="text-red-500 text-base w-full">
                {errors.category.message}
              </span>
            )}

            {/* Category value */}
            {!useManualInput &&
            (selectedCategory === "Player Performance" ||
              selectedCategory === "Team Performance") ? (
              <div styles={customStyles} className="w-full">
                <Controller
                  name="category_value"
                  control={control}
                  rules={{
                    required: "This field is required",
                  }}
                  render={({ field }) => (
                    <Select
                      isLoading={loading}
                      options={selectOptions}
                      value={
                        selectOptions.find(
                          option => option.value === field.value,
                        ) || null
                      }
                      onChange={option => field.onChange(option.value)}
                      placeholder="Search here..."
                      classNamePrefix="react-select"
                      styles={customStyles}
                      className="w-full"
                      noOptionsMessage={() => {
                        if (loading) return "Loading...";

                        return (
                          <div className="text-center py-2">
                            <p className="text-gray-400 text-sm mb-2">
                              No player/team found
                            </p>

                            <button
                              type="button"
                              onClick={() => setUseManualInput(true)}
                              className="text-[#E7000B] cursor-pointer underline text-sm"
                            >
                              Add manually
                            </button>
                          </div>
                        );
                      }}
                    />
                  )}
                />
                {errors.category_value && (
                  <span className="text-red-500 text-base w-full block mt-3">
                    {errors.category_value.message}
                  </span>
                )}
              </div>
            ) : (
              <div className="w-full">
                <input
                  type="text"
                  className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none block mb-3"
                  placeholder={
                    selectedCategory === "Player Performance"
                      ? "Enter Player name"
                      : selectedCategory === "Team Performance"
                        ? "Enter team name"
                        : selectedCategory === "Betting Line / Spread / Total"
                          ? "Enter Betting Line/ Spread/ Total"
                          : selectedCategory === "Officiating / Referee Call"
                            ? "Enter Referee name (optional)"
                            : selectedCategory === "Game Result / Outcome"
                              ? "Enter Game Result / Outcome"
                              : "Enter text"
                  }
                  {...register("category_value", {
                    validate: value => {
                      const text = value?.trim() || "";

                      // Required (except referee optional)
                      if (
                        watchedCategory !== "Officiating / Referee Call" &&
                        !text
                      ) {
                        return "This field is required";
                      }

                      // Minimum 7 characters
                      if (text && text.length < 7) {
                        return "Must be at least 7 characters";
                      }

                      return true;
                    },
                  })}
                />
                {errors.category_value && (
                  <span className="text-red-500 text-base w-full">
                    {errors.category_value.message}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <div className="w-full">
              <textarea
                placeholder={
                  selectedCategory === "Officiating / Referee Call"
                    ? "Describe the call/no-call and the game"
                    : "Describe what happened in detail..."
                }
                className={`w-full h-36 rounded-lg border border-[#364153] bg-transparent px-4 py-3 outline-none mb-3 ${descriptionValue.length > 500 ? "text-red-500" : "text-white"}`}
                onPaste={e => e.preventDefault()}
                onDrop={e => e.preventDefault()}
                onCut={e => e.preventDefault()}
                {...register("description", {
                  required: "Please provide complaint details",
                  validate: value => {
                    const text = value.trim();

                    // Block 10+ repeated characters
                    if (/(.)\1{9,}/.test(text)) {
                      return "Please avoid repeating the same character excessively";
                    }

                    // Minimum 50 characters
                    if (text.length < 50) {
                      return "Description must be at least 50 characters long";
                    }

                    // Maximum 500 characters
                    if (text.length > 500) {
                      return "Description cannot exceed 500 characters";
                    }

                    return true;
                  },
                })}
              />

              {/* Character counter */}
              <div
                className={`flex justify-between text-sm mb-2 ${descriptionValue.length > 50 || descriptionValue.length === 0 ? "text-gray-400" : "text-red-500"}`}
              >
                <span>{descriptionValue.length}/500 characters</span>
              </div>

              {errors.description && (
                <span className="text-red-500 text-base w-full">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Severity */}
            <div
              className="relative w-full"
              ref={severityDropdownRef}
              onClick={() => handleTabChange("severity")}
            >
              <button
                type="button"
                className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none flex justify-between items-center"
              >
                {severity || "Severity (1-5)"}
                <DropdownIcon />
              </button>

              <input
                type="hidden"
                {...register("severity", {
                  required: "Please select a severity level",
                })}
              />

              {openDropdown === "severity" && (
                <div className="absolute mt-[-50px] right-0 w-[262px] bg-[#18181B] rounded-lg">
                  {severityOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectSeverity(option)}
                      className={`flex py-2 text-white cursor-pointer ${
                        severity === `${option?.label} (${option?.count})`
                          ? "bg-[#E7000B]"
                          : ""
                      }`}
                    >
                      <span className="px-4 flex items-center gap-1">
                        {index + 1}
                        {Array.from({ length: index + 1 }).map((_, i) => (
                          <InputStar key={i} />
                        ))}
                      </span>
                      <span> - {option?.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {errors.severity && (
              <span className="text-red-500 text-base w-full">
                {errors.severity.message}
              </span>
            )}
          </div>

          <p className="text-xs  text-[#B0B0B0] w-full text-center  leading-4 ">
            By submitting, you agree to the{" "}
            <Link to={"/community-rules"}>
              <span className="text-[#D80000]  ">Community Rules </span>
            </Link>
            and{" "}
            <Link to={"/community-guidelines"}>
              <span className="text-[#D80000] font-bold ">
                Community Guidelines
              </span>
            </Link>
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3.5 mt-2 w-full bg-[#E7000B] rounded-lg text-white font-bold uppercase cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? " SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitComplain;
