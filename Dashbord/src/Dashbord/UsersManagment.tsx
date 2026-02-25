import React from "react";
import { useContextProvider } from "../DashbordContext/useContextProvider";
import type { usertype } from "../Interfaces/userType";
import { MdAutoDelete, MdDangerous } from "react-icons/md";
import { deleteUser } from "../services/userservices";
import toast from "react-hot-toast";

function UsersManagment(): React.JSX.Element {
  const { getAllusers, setAllusers } = useContextProvider();
  const [isconfirmingDelete, setIsConfirmingDelete] =React.useState<boolean>(false);
  const [iddelete, setIddelete] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  // Simuler le chargement initial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const deleteser = async (id: string) => {
    setIsDeleting(true);
    try {
      const res=await deleteUser(id);
      setAllusers(getAllusers.filter((user: usertype) => user._id !== id));
       setIsConfirmingDelete(false);
       setIddelete("");
       setName("");
        toast.success(
          res?.data?.data + "  deleted successfully" ||
            "User deleted successfully",
          {
            duration: 4000,
            position: "top-center",
          },
        );
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center bg-surface-hover dark:bg-dark-surface-light">
      <div className="w-full bg-white dark:bg-dark-bg rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr,2fr,3fr,auto] items-center px-4 py-3 dark:bg-dark-surface bg-slate-50 border-b dark:border-dark-border text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          <span>ID</span>
          <span>Nom</span>
          <span>Email</span>
          <span className="text-right pr-1">Actions</span>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y dark:divide-dark-border">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr,2fr,3fr,auto] items-center px-4 py-4 animate-pulse"
              >
                <div className="h-4 bg-slate-200 dark:bg-dark-surface rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-dark-surface rounded w-2/3"></div>
                <div className="h-4 bg-slate-200 dark:bg-dark-surface rounded w-4/5"></div>
                <div className="flex justify-end">
                  <div className="h-8 w-8 bg-slate-200 dark:bg-dark-surface rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Users List */
          <div className="divide-y dark:divide-dark-border">
            {getAllusers.length === 0 ? (
              <div className="px-4 py-12 text-center text-slate-500 dark:text-slate-400">
                Aucun utilisateur trouvé
              </div>
            ) : (
              getAllusers.map((user: usertype) => (
                <div
                  key={user._id}
                  className="grid grid-cols-[2fr,2fr,3fr,auto] hover:cursor-pointer dark:bg-dark-bg dark:hover:bg-dark-surface-light items-center px-4 py-3 text-sm hover:bg-slate-50 transition-colors"
                >
                  <p className="font-mono text-xs dark:text-slate-400 text-text-muted truncate">
                    {user._id}
                  </p>
                  <p className="font-medium dark:text-white text-text truncate">
                    {user.name}
                  </p>
                  <p className="text-text dark:text-slate-300 truncate">
                    {user.email}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setIsConfirmingDelete(true);
                        setIddelete(user._id.toString());
                        setName(user.name);
                      }}
                      className="inline-flex items-center p-2 hover:bg-red-50 dark:hover:bg-red-900/20 justify-center rounded-full text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                      title="Supprimer l'utilisateur"
                    >
                      <MdAutoDelete className="text-lg hover:text-xl transition-all duration-200" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal de confirmation améliorée */}
      {isconfirmingDelete && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity"
            onClick={() => {
              if (!isDeleting) {
                setIsConfirmingDelete(false);
                setIddelete("");
                setName("");
              }
            }}
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
            <div className="bg-white dark:bg-dark-sidebar rounded-xl shadow-2xl border border-slate-200 dark:border-dark-border overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-dark-border bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30">
                    <MdDangerous className="text-2xl text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Confirmer la suppression
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {name}
                  </span>{" "}
                  ? Cette action est irréversible.
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-dark-surface-light border-t border-slate-200 dark:border-dark-border flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsConfirmingDelete(false);
                    setIddelete("");
                    setName("");
                  }}
                  disabled={isDeleting}
                  className="px-5 py-2.5 bg-white dark:bg-dark-bg border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annuler
                </button>
                <button
                  onClick={() => deleteser(iddelete)}
                  disabled={isDeleting}
                  className="px-5 py-2.5 bg-primary dark:bg-primary-hover text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Suppression...
                    </>
                  ) : (
                    "Supprimer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UsersManagment;
