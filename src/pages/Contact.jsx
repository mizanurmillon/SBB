import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { DropdownIcon } from "../components/SvgContainer/SvgContainer";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactPage = () => {
  const navigate = useNavigate();
  const subjectDropdownRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(false);
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const publicId = import.meta.env.VITE_PUBLIC_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;

  
    useEffect(() => {
      document.title = "SBB - Contact Us";
  
      // reset to default title on unmount
      return () => {
        document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
      };
    }, []);

  const subjectOptions = [
    "General Inquiry",
    "Support",
    "Feedback",
    "Complaint",
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async data => {
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        { publicKey: publicId },
      );

      reset();
      navigate("/message-send-success");
      console.log("SUCCESS!");
    } catch (error) {
      Swal.fire({
        icon: "error",
        position: "top-end",
        title: "Oops...",
        text: "Failed to send message. Please try again",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("FAILED...", error.text);
    }
  };

  return (
    <section className="h-auto pb-[120px] pt-6 w-full bg-black">
      <div className="container flex flex-col gap-y-6 items-center">
        <h2 className="text-[32px] text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
          Contact Us
        </h2>

        <form
          className="flex w-full relative flex-col gap-y-6 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Field */}
          <input
            type="text"
            {...register("name", { required: "Please provide your name" })}
            className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none"
            placeholder="Your Name"
          />
          {errors.name && (
            <span className="text-red-500 text-base text-left w-full">
              {errors.name.message}
            </span>
          )}

          {/* Email Field */}
          <input
            type="email"
            {...register("email", {
              required: "Please provide your email address",
            })}
            className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none"
            placeholder="Your Email"
          />
          {errors.email && (
            <span className="text-red-500 text-base text-left w-full">
              {errors.email.message}
            </span>
          )}

          {/* Subject Dropdown using Controller */}
          <Controller
            control={control}
            name="subject"
            rules={{ required: "Please select a subject" }}
            render={({ field }) => (
              <div className="relative w-full" ref={subjectDropdownRef}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(prev => !prev)}
                  className="w-full rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none flex justify-between items-center"
                >
                  {field.value || "Select a Subject"}
                  <DropdownIcon />
                </button>

                {openDropdown && (
                  <div className="absolute py-1.5 mt-2 top-12 right-0 w-[249px] rounded-lg shadow-lg flex flex-col bg-[#18181B] z-10">
                    {subjectOptions.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          field.onChange(option);
                          setOpenDropdown(false);
                        }}
                        className={`text-[15px] text-white cursor-pointer leading-[150%] flex flex-col ${
                          field.value === option ? "bg-[#E7000B]" : ""
                        }`}
                      >
                        <span className="px-4 py-2">{option}</span>
                        {subjectOptions.length - 1 !== index && (
                          <hr className="border-[0.5px] border-solid border-gray-700" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {errors.subject && (
                  <span className="text-red-500 text-base text-left w-full mt-1">
                    {errors.subject.message}
                  </span>
                )}
              </div>
            )}
          />

          {/* Message Field */}
          <textarea
            {...register("message", { required: "Please write a message" })}
            placeholder="Your Message"
            className="w-full h-36 rounded-lg border border-[#364153] text-white bg-transparent px-4 py-3 outline-none"
          />
          {errors.message && (
            <span className="text-red-500 text-base text-left w-full">
              {errors.message.message}
            </span>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3.5 w-full cursor-pointer h-auto bg-[#E7000B] rounded-lg text-white font-bold leading-[150%] uppercase disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting...." : "SUBMIT"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
