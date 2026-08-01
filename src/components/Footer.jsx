import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#0c1a10] text-white">
            <div className="container_s mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 bg-[#3d8b5e] rounded-lg flex items-center justify-center"><span className="text-white text-[11px] font-medium">SN</span></div><span className="font-medium text-lg">SportNest</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5 font-light">Your trusted platform for discovering and booking premium sports facilities across New York and New Jersey.</p>
                        <div className="flex items-center gap-2"><a href="#" title="Facebook" className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:bg-[#3d8b5e] hover:text-white transition-all duration-200">f</a><a href="#" title="Instagram" className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:bg-[#3d8b5e] hover:text-white transition-all duration-200">in</a><a href="#" title="X" className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:bg-[#3d8b5e] hover:text-white transition-all duration-200">X</a><a href="#" title="YouTube" className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:bg-[#3d8b5e] hover:text-white transition-all duration-200">yt</a></div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-4 text-gray-200">Quick Links</h4>
                        <ul className="space-y-2.5">
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light" href="/">Home</Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light" href="/facilities">All Facilities</Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light" href="/login">Login</Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light" href="/register">Register</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-4 text-gray-200">Sports</h4>
                        <ul className="space-y-2.5">
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light flex items-center gap-1.5" href="/facilities"><span>⚽</span><span>Football</span></Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light flex items-center gap-1.5" href="/facilities"><span>🏸</span><span>Badminton</span></Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light flex items-center gap-1.5" href="/facilities"><span>🎾</span><span>Tennis</span></Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light flex items-center gap-1.5" href="/facilities"><span>🏊</span><span>Swimming</span></Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light flex items-center gap-1.5" href="/facilities"><span>🏀</span><span>Basketball</span></Link></li>
                            <li><Link className="text-gray-400 text-sm hover:text-white transition-colors font-light flex items-center gap-1.5" href="/facilities"><span>🏏</span><span>Cricket</span></Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-4 text-gray-200">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2.5 text-gray-400 text-sm font-light"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-[#6cbf8a] flex-shrink-0">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>hello@sportnest.com</li>
                            <li className="flex items-center gap-2.5 text-gray-400 text-sm font-light"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone text-[#6cbf8a] flex-shrink-0">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>+1 (212) 555-0198</li>
                            <li className="flex items-center gap-2.5 text-gray-400 text-sm font-light"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-[#6cbf8a] flex-shrink-0">
                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>123 Sport Ave, New York, NY 10001</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-500 text-xs font-light">© 2025 SportNest Inc. All rights reserved.</p>
                    <div className="flex items-center gap-5 text-gray-500 text-xs"><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a><a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a><a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;