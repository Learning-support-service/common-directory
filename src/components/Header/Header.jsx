import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import '../../styles/home.css'

function safeParse(key, fallback=null){
  try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
}

export default function Header(){
  // kept for compatibility but intentionally renders nothing to avoid duplicate headers
  return null
}
