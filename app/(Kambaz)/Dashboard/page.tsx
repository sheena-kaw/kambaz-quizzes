import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> COMM1210 Persuasion and Rhetoric </h5>
              <p className="wd-dashboard-course-title">
                Learn how to Win Arguments with 100% Success
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> CS2500 Fundamentals of Computer Science I </h5>
              <p className="wd-dashboard-course-title">
                Where Fun Dies Part I
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> CS2510 Fundamentals of Computer Science II </h5>
              <p className="wd-dashboard-course-title">
                Where Fun Dies Part II
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> CS2511 Fundamentals of Computer Science II: Lab </h5>
              <p className="wd-dashboard-course-title">
                Where Fun Dies Part II: Lab Edition
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> CS3500 Object-Oriented Design </h5>
              <p className="wd-dashboard-course-title">
                Where YOU Actually Die
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image 
                src="/images/teslabot.jpg" 
                width={200} 
                height={150} 
                alt=" " 
            />
            <div>
              <h5> CS3800 Theory of Computation </h5>
              <p className="wd-dashboard-course-title">
                Theoretical Torture
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
