import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      {/* <Navbar /> */}

      {/* Main content with top padding to account for fixed navbar */}
      <main style={{ paddingTop: "5rem", padding: "5rem 1rem 0 1rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#111827", marginBottom: "1rem" }}>
              Welcome to SkillSwap
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#6B7280",
                marginBottom: "2rem",
                maxWidth: "48rem",
                margin: "0 auto 2rem auto",
              }}
            >
              Exchange skills without money. Learn guitar, teach coding, swap photography for design.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginTop: "3rem",
              }}
            >
              <div
                className="hover-lift"
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#DBEAFE",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>🔍</span>
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Browse Skills</h3>
                <p style={{ color: "#6B7280" }}>Find people offering skills you want to learn</p>
              </div>

              <div
                className="hover-lift"
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#FEF3C7",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>⭐</span>
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Offer Your Skills</h3>
                <p style={{ color: "#6B7280" }}>Share what you know and help others learn</p>
              </div>

              <div
                className="hover-lift"
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#D1FAE5",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>🤝</span>
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Make Connections</h3>
                <p style={{ color: "#6B7280" }}>Connect with like-minded learners and teachers</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
