import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaPaw } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  LuClock,
  LuHeart,
  LuSearch,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { SiPetsathome } from "react-icons/si";
import { NavLink } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
const PetListing = () => {
  const axiosPublic = UseAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets");
      return res.data;
    },
  });
  const visible = useMemo(
    () =>
      pets
        .filter((pet) => pet.adopted === "false")
        .filter(
          (pet) =>
            !search || pet.name?.toLowerCase().includes(search.toLowerCase()),
        )
        .filter((pet) => category === "all" || pet.category === category),
    [pets, search, category],
  );
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
  };
  return (
    <>
      {" "}
      <Helmet>
        {" "}
        <title>Paw | Pet Listing</title>{" "}
      </Helmet>{" "}
      <main className="min-h-screen bg-slate-50 pb-20 pt-[110px] sm:pt-[125px]">
        {" "}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {" "}
          {/* Header */}{" "}
          <section className="mb-8">
            {" "}
            <div className="max-w-3xl">
              {" "}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2">
                {" "}
                <FaPaw className="text-sm text-teal-700" />{" "}
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                  {" "}
                  Find your companion{" "}
                </span>{" "}
              </div>{" "}
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {" "}
                Pets waiting for{" "}
                <span className="text-teal-700"> a loving home </span>{" "}
              </h1>{" "}
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                {" "}
                Browse our available pets and discover a new companion who is
                waiting for care, friendship, and a forever home.{" "}
              </p>{" "}
            </div>{" "}
          </section>{" "}
          {/* Search & Filter */}{" "}
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {" "}
            <div className="mb-4 flex items-center gap-2">
              {" "}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50">
                {" "}
                <LuSlidersHorizontal className="text-teal-700" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h2 className="text-sm font-bold text-slate-800">
                  {" "}
                  Find your perfect pet{" "}
                </h2>{" "}
                <p className="text-xs text-slate-400">
                  {" "}
                  Search by name or filter by category{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              {" "}
              {/* Search */}{" "}
              <div className="relative">
                {" "}
                <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />{" "}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by pet name..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                />{" "}
              </div>{" "}
              {/* Category */}{" "}
              <div className="relative">
                {" "}
                <FaPaw className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-teal-700" />{" "}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                >
                  {" "}
                  <option value="all"> All categories </option>{" "}
                  <option value="Dog">Dog</option>{" "}
                  <option value="Cat">Cat</option>{" "}
                  <option value="Rabbit">Rabbit</option>{" "}
                  <option value="Fish">Fish</option>{" "}
                  <option value="Others">Others</option>{" "}
                </select>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          {/* Results Header */}{" "}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {" "}
            <div>
              {" "}
              <h2 className="text-lg font-extrabold text-slate-800">
                {" "}
                Available Pets{" "}
              </h2>{" "}
              <p className="mt-1 text-sm text-slate-400">
                {" "}
                {isLoading
                  ? "Finding available pets..."
                  : `${visible.length} ${visible.length === 1 ? "pet" : "pets"} available`}{" "}
              </p>{" "}
            </div>{" "}
            {(search || category !== "all") && !isLoading && (
              <button
                onClick={clearFilters}
                className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                {" "}
                Clear filters{" "}
              </button>
            )}{" "}
          </div>{" "}
          {/* Loading State */}{" "}
          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {" "}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {" "}
                  <div className="aspect-[4/3] animate-pulse bg-slate-200" />{" "}
                  <div className="space-y-4 p-5">
                    {" "}
                    <div className="h-6 w-2/3 animate-pulse rounded-lg bg-slate-200" />{" "}
                    <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-200" />{" "}
                    <div className="h-4 w-full animate-pulse rounded-lg bg-slate-200" />{" "}
                    <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>
          ) : visible.length > 0 ? (
            /* Pet Cards */ <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {" "}
              {visible.map((pet) => (
                <article
                  key={pet._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                >
                  {" "}
                  {/* Image */}{" "}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {" "}
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />{" "}
                    {/* Image Overlay */}{" "}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />{" "}
                    {/* Category */}{" "}
                    <div className="absolute left-4 top-4">
                      {" "}
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm backdrop-blur">
                        {" "}
                        <FaPaw className="text-[10px]" /> {pet.category}{" "}
                      </span>{" "}
                    </div>{" "}
                    {/* Heart */}{" "}
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-400 shadow-sm backdrop-blur transition group-hover:text-red-500">
                      {" "}
                      <LuHeart className="text-base" />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Content */}{" "}
                  <div className="p-5">
                    {" "}
                    <div className="flex items-start justify-between gap-3">
                      {" "}
                      <div className="min-w-0">
                        {" "}
                        <h3 className="truncate text-xl font-extrabold text-slate-900">
                          {" "}
                          {pet.name}{" "}
                        </h3>{" "}
                        <p className="mt-1 text-sm font-medium text-slate-400">
                          {" "}
                          {pet.age} {Number(pet.age) === 1 ? "year" : "years"}{" "}
                          old{" "}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Pet Info */}{" "}
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {" "}
                      <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                        {" "}
                        <FaLocationDot className="shrink-0 text-sm text-teal-600" />{" "}
                        <span className="truncate text-xs font-semibold text-slate-600">
                          {" "}
                          {pet.location}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex min-w-0 items-center justify-end gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                        {" "}
                        <LuClock className="shrink-0 text-sm text-teal-600" />{" "}
                        <span className="truncate text-xs font-semibold text-slate-600">
                          {" "}
                          {pet.time?.split("T")[0]}{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Details Button */}{" "}
                    <NavLink
                      to={`/petdetails/${pet._id}`}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md"
                    >
                      {" "}
                      View Details{" "}
                      <span className="transition-transform group-hover:translate-x-1">
                        {" "}
                        →{" "}
                      </span>{" "}
                    </NavLink>{" "}
                  </div>{" "}
                </article>
              ))}{" "}
            </div>
          ) : (
            /* Empty State */ <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center shadow-sm">
              {" "}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
                {" "}
                <SiPetsathome className="text-3xl text-teal-600" />{" "}
              </div>{" "}
              <h3 className="mt-5 text-lg font-extrabold text-slate-800">
                {" "}
                No pets found{" "}
              </h3>{" "}
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                {" "}
                We couldn&apos;t find any pets matching your current search or
                category. Try changing the filters to see more pets.{" "}
              </p>{" "}
              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
              >
                {" "}
                Show all pets{" "}
              </button>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
};
export default PetListing;
