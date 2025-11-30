import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AvatarUploader } from "@/components/common/AvatrUpload";
import { showError, showSuccess } from "@/lib/toast";
import {
  profileSchema,
  type ProfileForm,
} from "@/schema/profile/profile.schema";
import {
  profileService,
  type ProfilePayload,
} from "@/services/profile.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: profileService.getMe,
  });

  const mutation = useMutation({
    mutationFn: (payload: ProfilePayload) => profileService.updateUser(payload),
    onSuccess: () => {
      showSuccess("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => showError("Update failed"),
  });

  const { register, handleSubmit, formState } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: data ? { name: data.name, email: data.email } : undefined,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 min-h-screen bg-[#0A2540] text-white">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-6 pb-8 border-b border-white/10"
      >
        <AvatarUploader
          initial={data.name}
          onUpload={(file) => console.log("Uploaded:", file)}
        />

        <div>
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <div className="flex gap-2 items-center mt-1">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs tracking-wide border border-white/20">
              {data.role}
            </span>
          </div>
          <p className="text-white/50 text-sm mt-1">
            Member since {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </motion.div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 justify-center items-center">
        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl bg-white/10 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white/90">
                Account Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit((values) => mutation.mutate(values))}
              >
                <div className="space-y-5">
                  <div>
                    <Label className="text-white/80">Name</Label>
                    <Input
                      {...register("name")}
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder-white/30"
                      placeholder="Your name"
                    />
                    {formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white/80">Email</Label>
                    <Input
                      {...register("email")}
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder-white/30"
                      placeholder="Your email"
                    />
                    {formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="flex items-center gap-2 justify-center bg-brand-accent hover:bg-brand accent/90 text-brand-midnight font-semibold py-2 px-4 rounded md:w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl bg-red-500/10 backdrop-blur-xl border-red-500/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-red-300/80 text-sm">
                Actions here are permanent. Be careful.
              </p>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/30">
                Delete Account
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-400/40 text-red-400 hover:bg-red-500/10"
              >
                Logout All Devices
              </Button>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
