-- Migration: 004_color_name
-- Description: Add color_name column to profiles for storing poetic Georgian color names

alter table profiles add column color_name text;
