"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, Sparkles, Search, ArrowLeft, Lightbulb, Code, Layers, 
  Smile, CheckCircle2, Bookmark, Flame, Zap, Award 
} from 'lucide-react';

interface DSANote {
  id: string;
  topic: string;
  category: string;
  icon: string;
  title: string;
  childAnalogy: string;
  realLifeRef: string;
  memoryTrick: string;
  keyTakeaway: string;
  timeComplexity: string;
  spaceComplexity: string;
  codeSnippet: string;
  bengaliNote: string;
}

const DSA_NOTES_DATA: DSANote[] = [
  {
    id: "arrays-hashing",
    topic: "Arrays & HashMaps",
    category: "Data Structures",
    icon: "📦",
    title: "Arrays vs HashMaps (The School Locker vs Magic Phonebook)",
    childAnalogy: "Imagine an Array is a row of numbered school lockers [0, 1, 2, 3]. To find Locker #3, you walk straight to door 3! But a HashMap is a magic phonebook: you say a friend's name, and it INSTANTLY hands you their secret candy locker key in 1 second!",
    realLifeRef: "Array = Parking lot slots marked 1 to 50. HashMap = Contact list on your phone searching 'Mom'.",
    memoryTrick: "💡 Array = Sequential boxes. HashMap = Key ➔ Value instant lookup table O(1).",
    keyTakeaway: "Use Arrays when order matters. Use HashMaps when you need instant O(1) lookups by key.",
    timeComplexity: "Array Access: O(1) | HashMap Lookup: O(1)",
    spaceComplexity: "O(N) memory storage",
    codeSnippet: `# Array access vs HashMap lookup
nums = [10, 20, 30]
print(nums[1])  # 20 (Array index lookup)

# HashMap (Dictionary in Python)
phonebook = {"Ritam": "9876543210"}
print(phonebook["Ritam"])  # Instant O(1) lookup`,
    bengaliNote: "সহজ বাংলা নোট: অ্যারে হলো পরপর নাম্বারিং করা বাক্সের মতো। আর হ্যাশম্যাপ হলো একটি জাদুকরী টেলিফোন ডিরেক্টরি যেখানে যেকোনো বন্ধুর নাম বললে সাথে সাথে ১ সেকেন্ডে তার নম্বর পেয়ে যাবেন।"
  },
  {
    id: "two-pointers",
    topic: "Two Pointers",
    category: "Algorithms",
    icon: "👈👉",
    title: "Two Pointers Strategy (Two Friends Walking on a Bridge)",
    childAnalogy: "Imagine two friends starting from opposite ends of a long wooden bridge. Left friend steps right ➔, Right friend steps left . They meet in the middle to find the matching pair of shoes!",
    realLifeRef: "Checking if a word like 'RACECAR' reads the same forwards and backwards by matching outside letters inwards.",
    memoryTrick: "💡 Sorted Array + Searching Pair ➔ Use Left=0 and Right=N-1 pointers.",
    keyTakeaway: "Instead of two nested loops O(N²), two pointers solve sorted array problems in linear O(N) time.",
    timeComplexity: "O(N) linear time pass",
    spaceComplexity: "O(1) auxiliary memory",
    codeSnippet: `# Two Pointers for Sorted Array Two Sum
def twoSumSorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1  # Need bigger number
        else:
            right -= 1 # Need smaller number
    return []`,
    bengaliNote: "সহজ বাংলা নোট: টু পয়েন্টার মানে দুটো বন্ধু ব্রিজের দুই প্রান্ত থেকে হাঁটা শুরু করে মাঝে মিল খুঁজে বের করছে। সাজানো (Sorted) অ্যারে থাকলে দুটো নেস্টেড লুপের বদলে মাত্র O(N) সময়ে উত্তর খুঁজে পাওয়া যায়।"
  },
  {
    id: "sliding-window",
    topic: "Sliding Window",
    category: "Algorithms",
    icon: "🪟",
    title: "Sliding Window Technique (The Moving Magnifying Glass)",
    childAnalogy: "Imagine holding a small rectangular cardboard frame over a comic book page. Slide the frame one picture to the right ➔. As 1 new picture enters the right side, 1 old picture leaves the left side!",
    realLifeRef: "Tracking the average temperature of the last 7 days as today passes.",
    memoryTrick: "💡 Subarray / Substring problems ➔ Expand Right pointer, Shrink Left pointer when invalid.",
    keyTakeaway: "Reuses previous calculations of overlapping subarrays instead of re-calculating from scratch.",
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(1) or O(K) window map",
    codeSnippet: `# Sliding Window Max Sum of Size K
def maxSumSubarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # Add right, subtract left
        max_sum = max(max_sum, window_sum)
    return max_sum`,
    bengaliNote: "সহজ বাংলা নোট: স্লাইডিং উইন্ডো হলো একটি স্লাইডিং জানালার মতো। নতুন একটি আইটেম ডানে যুক্ত হলে বামের একটি আইটেম বাদ যায়। সাব-অ্যারের যোগফল বার বার না গুনে সংক্ষেপে বের করার উপায়।"
  },
  {
    id: "stack-queue",
    topic: "Stack & Queue",
    category: "Data Structures",
    icon: "🥞",
    title: "Stack vs Queue (Dinner Plates vs Ice Cream Line)",
    childAnalogy: "Stack = A stack of heavy dinner plates 🥞. The LAST plate put on top is the FIRST plate you take off (LIFO)! Queue = People waiting in line for ice cream 🍦. The FIRST person in line gets served FIRST (FIFO)!",
    realLifeRef: "Stack = Browser Back button / Undo (Ctrl+Z). Queue = Printer document queue.",
    memoryTrick: "💡 Stack = LIFO (Last In First Out) | Queue = FIFO (First In First Out)",
    keyTakeaway: "Stacks track nested parentheses and backtracking. Queues power BFS graph breadth traversals.",
    timeComplexity: "Push / Pop / Enqueue / Dequeue: O(1)",
    spaceComplexity: "O(N) elements storage",
    codeSnippet: `# Stack (LIFO) in Python
stack = []
stack.append('A')  # Push
stack.append('B')
top = stack.pop()  # Returns 'B' (Last In First Out)

# Queue (FIFO) using deque
from collections import deque
queue = deque(['A', 'B'])
front = queue.popleft() # Returns 'A' (First In First Out)`,
    bengaliNote: "সহজ বাংলা নোট: স্ট্যাক হলো প্লেটের স্তূপের মতো (শেষের প্লেট আগে উঠবে - LIFO)। আর কিউ হলো আইসক্রিমের লাইনের মতো (প্রথম জন আগে আইসক্রিম পাবে - FIFO)।"
  },
  {
    id: "binary-search",
    topic: "Binary Search",
    category: "Algorithms",
    icon: "🔍",
    title: "Binary Search (Dictionary Half-Splitting Trick)",
    childAnalogy: "Imagine guessing a secret number between 1 and 100. If you guess 50 and I say 'TOO HIGH!', you instantly throw away all numbers from 50 to 100! Next you try 25. Every guess cuts your work in HALF!",
    realLifeRef: "Opening a printed dictionary right in the middle to find words starting with 'M'.",
    memoryTrick: "💡 Sorted Array + Search ➔ Mid = (Low + High)//2. Halves search space O(log N).",
    keyTakeaway: "Searches 1 Billion items in just ~30 steps using logarithmic O(log N) operations.",
    timeComplexity: "O(log N) logarithmic time",
    spaceComplexity: "O(1) iterative",
    codeSnippet: `# Binary Search Algorithm
def binarySearch(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    bengaliNote: "সহজ বাংলা নোট: ১ থেকে ১০০ এর মধ্যে সংখ্যা অনুমান করার খেলায় প্রতিবার অর্ধেক বাদ দিয়ে দেওয়া। ১০ কোটি জিনিস থেকেও মাত্র ৩০ টি পদক্ষেপে সঠিক জিনিস খুঁজে বের করা সম্ভব।"
  },
  {
    id: "linked-list",
    topic: "Linked List",
    category: "Data Structures",
    icon: "🔗",
    title: "Linked List (The Secret Treasure Hunt Clue Game)",
    childAnalogy: "Imagine a treasure hunt! Card #1 says: 'Go to the yellow sofa'. Sofa has Card #2: 'Go under the bed'. Each card holds a value AND a pointer pointing to where the NEXT card is hidden!",
    realLifeRef: "A train composed of connected carriages linked end-to-end.",
    memoryTrick: "💡 Node = [Value | Next Pointer]. Fast insertions O(1), no fixed size limit.",
    keyTakeaway: "Unlike Arrays, elements are scattered in memory and connected via pointers.",
    timeComplexity: "Prepend/Append: O(1) | Search: O(N)",
    spaceComplexity: "O(N) nodes",
    codeSnippet: `# Single Linked List Node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Node 1 -> Node 2 -> None
head = ListNode(10, ListNode(20))
print(head.val)        # 10
print(head.next.val)   # 20`,
    bengaliNote: "সহজ বাংলা নোট: লিঙ্কড লিস্ট হলো ট্রেজার হান্ট খেলার গুপ্তধনের কার্ডের মতো। প্রতিটা কার্ডের সাথে পরের কার্ডের ঠিকানা লেখা থাকে।"
  },
  {
    id: "trees-bst",
    topic: "Trees & Binary Search Trees",
    category: "Data Structures",
    icon: "🌳",
    title: "Binary Search Tree (The Organized Family Tree)",
    childAnalogy: "Imagine a family tree rooted at the top. The boss (root node) stands at the center. Everyone SMALLER goes to the LEFT branch 👈. Everyone BIGGER goes to the RIGHT branch 👉!",
    realLifeRef: "Folder directories on your computer (C: ➔ Documents ➔ Homework ➔ Math.pdf).",
    memoryTrick: "💡 BST Property: Left < Root < Right. Inorder traversal yields sorted values.",
    keyTakeaway: "Enables fast O(log N) insertions, deletions, and hierarchical searching.",
    timeComplexity: "Search / Insert: O(log N) average",
    spaceComplexity: "O(H) tree height memory",
    codeSnippet: `# BST Search Recursion
def searchBST(root, val):
    if not root or root.val == val:
        return root
    if val < root.val:
        return searchBST(root.left, val)  # Search Left
    return searchBST(root.right, val)     # Search Right`,
    bengaliNote: "সহজ বাংলা নোট: বাইনারি সার্চ ট্রিতে বসের বাম পাশে সব ছোট সদস্যরা দাঁড়ায়, আর ডান পাশে বড় সদস্যরা দাঁড়ায়। ফলে যেকোনো জিনিস দ্রুত খুঁজে পাওয়া যায়।"
  },
  {
    id: "dynamic-programming",
    topic: "Dynamic Programming",
    category: "Algorithms",
    icon: "🧩",
    title: "Dynamic Programming (Writing Answers on Paper to Avoid Duplicate Math)",
    childAnalogy: "Teacher asks: 'What is 1 + 1 + 1 + 1 + 1?' Child counts: '5!'. Teacher adds '+ 1' at the end: 'What is it now?' Child instantly says '6!' without re-counting the first 5 ones because they MEMORIZED the previous answer!",
    realLifeRef: "Web browser caching web pages so it doesn't download them from scratch every time.",
    memoryTrick: "💡 DP = Recursion + Memoization (Notepad Memory Table). Prevents duplicate work.",
    keyTakeaway: "Turns exponential O(2ⁿ) brute-force algorithms into polynomial O(N) or O(N²) speeds.",
    timeComplexity: "O(N) with Memoization",
    spaceComplexity: "O(N) DP array table",
    codeSnippet: `# Fibonacci DP with Memoization Table
def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]`,
    bengaliNote: "সহজ বাংলা নোট: ডাইনামিক প্রোগ্রামিং মানে খাতার কোণায় আগের উত্তর লিখে রাখা, যাতে একই বড় অংক দুইবার বার বার কষে সময় নষ্ট করতে না হয়।"
  }
];

export default function DSANotesPage() {
  const { isBengali } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNoteId, setActiveNoteId] = useState<string>(DSA_NOTES_DATA[0].id);

  const filteredNotes = DSA_NOTES_DATA.filter((note) => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.childAnalogy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCat = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activeNote = DSA_NOTES_DATA.find((n) => n.id === activeNoteId) || DSA_NOTES_DATA[0];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* Header Navbar */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white mb-2">
              <ArrowLeft className="w-4 h-4" />
              <span>{isBengali ? "হোমে ফিরে যান" : "Back to Home"}</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-2xl">
                📚
              </span>
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {isBengali ? "DSA মাস্টার নোটস হাব (Master Notes)" : "Ultra-Beginner DSA Master Notes"}
                </h1>
                <p className="text-xs text-amber-300 font-semibold mt-0.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{isBengali ? "৫ বছরের বাচ্চার মতো অতি সহজ ব্যাখ্যা • Powered by Ritam" : "5-Year-Old Child Explanations & Memory Tricks • Powered by Ritam"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBengali ? "নোটস খুঁজুন..." : "Search DSA notes & analogies..."}
              className="w-full bg-slate-900 text-sm text-gray-200 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500/60 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
          {['all', 'Data Structures', 'Algorithms'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'all' ? (isBengali ? 'সকল নোটস' : 'All DSA Topics') : cat}
            </button>
          ))}
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Note Cards List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
              <span>{isBengali ? "টপিক নির্বাচন করুন" : "Select Topic Note"}</span>
              <span className="font-mono text-gray-500">{filteredNotes.length} Topics</span>
            </div>

            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredNotes.map((note) => {
                const isActive = note.id === activeNote.id;

                return (
                  <div
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border-amber-400 shadow-xl scale-[1.01]'
                        : 'bg-slate-900/80 border-white/10 hover:border-white/20 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{note.icon}</span>
                        <span className="text-xs font-bold text-amber-300 font-mono">{note.topic}</span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-gray-300 border border-white/10">
                        {note.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                      {note.title}
                    </h4>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-sans">
                      {isBengali ? note.bengaliNote : note.childAnalogy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Master Note Reader */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Note Reader Header */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-slate-950/90 relative overflow-hidden space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeNote.icon}</span>
                  <div>
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider font-mono">
                      {activeNote.topic}
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                      {activeNote.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* 5-Year-Old Child Analogy Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                  <Smile className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span>{isBengali ? "৫ বছরের বাচ্চার মতো সহজ গল্প (5-Year-Old Child Analogy)" : "5-Year-Old Child Explanation"}</span>
                </div>
                <p className="text-sm text-amber-100 leading-relaxed font-medium">
                  {activeNote.childAnalogy}
                </p>
              </div>

              {/* Bengali Note Version */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{isBengali ? "বাংলা সংক্ষেপ নোটিং" : "Bengali Simplified Note"}</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed font-sans">
                  {activeNote.bengaliNote}
                </p>
              </div>

              {/* Real Life Reference Story */}
              <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-indigo-400" />
                  <span>{isBengali ? "বাস্তব জীবনের রেফারেন্স (Real Life Reference)" : "Real Life Reference"}</span>
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  {activeNote.realLifeRef}
                </p>
              </div>

              {/* Memory Trick / Cheat Sheet */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold leading-relaxed flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{isBengali ? "শর্টকাট মেমোরি ট্রিক:" : "Memory Cheat Sheet Trick:"}</span>
                  {activeNote.memoryTrick}
                </div>
              </div>

              {/* Code Example */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-blue-400" />
                    <span>{isBengali ? "সহজ কোড উদাহরণ (Python Code Snippet)" : "Simple Code Example"}</span>
                  </span>
                  <span className="font-mono text-cyan-400">{activeNote.timeComplexity}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed">
                  <pre>{activeNote.codeSnippet}</pre>
                </div>
              </div>

              {/* Note Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>150 STRICKs DSA Note Hub</span>
                <span className="text-cyan-400 font-bold">POWERED BY RITAM</span>
              </div>

            </div>

          </div>

        </div>

      </main>

      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs font-bold text-cyan-400">
        150 STRICKs • POWERED BY RITAM • DSA Master Notes
      </footer>

    </div>
  );
}
